import { type ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';

interface MarqueeProps {
    children: ReactNode;
    speed?: number;
    dir?: 'left' | 'right';
    className?: string;
}

export default function Marquee({ children, speed = 50, dir = 'left', className = '' }: MarqueeProps) {
    const viewportRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const copyRef = useRef<HTMLDivElement>(null);
    const [copies, setCopies] = useState(2);
    const [copyWidth, setCopyWidth] = useState(0);

    const progress = useRef(0);

    useLayoutEffect(() => {
        const viewport = viewportRef.current;
        const copy = copyRef.current;
        if (!viewport || !copy) return;

        const measure = () => {
            const width = copy.getBoundingClientRect().width;
            if (width <= 0) return;

            setCopyWidth(width);
            setCopies(Math.max(2, Math.ceil(viewport.getBoundingClientRect().width / width) + 1));
        };

        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(viewport);
        observer.observe(copy);

        return () => observer.disconnect();
    }, [children]);

    useEffect(() => {
        const track = trackRef.current;
        if (!track || copyWidth <= 0) return;

        const duration = (copyWidth / speed) * 1000;
        const animation = track.animate([{ transform: 'translate3d(0, 0, 0)' }, { transform: `translate3d(${-copyWidth}px, 0, 0)` }], {
            duration,
            easing: 'linear',
            iterations: Infinity,
            direction: dir === 'right' ? 'reverse' : 'normal',
        });
        animation.currentTime = progress.current * duration;

        return () => {
            const time = animation.currentTime;
            if (typeof time === 'number') progress.current = (time % duration) / duration;
            animation.cancel();
        };
    }, [copyWidth, speed, dir]);

    return (
        <div ref={viewportRef} className={`overflow-hidden ${className}`}>
            <div ref={trackRef} className="flex w-max will-change-transform">
                {Array.from({ length: copies }, (_, i) => (
                    <div key={i} ref={i === 0 ? copyRef : undefined} className="flex shrink-0" aria-hidden={i === 0 ? undefined : true}>
                        {children}
                    </div>
                ))}
            </div>
        </div>
    );
}
