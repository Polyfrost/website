import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - 2 ** (-10 * t));

export default function CountUp({ to, duration, delay = 0, className }: { to: number; duration: number; delay?: number; className?: string }) {
    const [ref, inView] = useInView({ threshold: 0.5, triggerOnce: true });
    const [value, setValue] = useState(0);
    const frame = useRef<number>(0);

    useEffect(() => {
        if (!inView) return;

        let start: number | null = null;

        const tick = (now: number) => {
            start ??= now;

            const elapsed = (now - start) / 1000 - delay;
            if (elapsed < 0) {
                frame.current = requestAnimationFrame(tick);
                return;
            }

            const progress = duration > 0 ? Math.min(elapsed / duration, 1) : 1;
            setValue(to * easeOutExpo(progress));

            if (progress < 1) frame.current = requestAnimationFrame(tick);
        };

        frame.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame.current);
    }, [inView, to, duration, delay]);

    return (
        <span ref={ref} className={className}>
            {Math.round(value).toLocaleString()}
        </span>
    );
}
