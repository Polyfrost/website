import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useImperativeHandle, useState, type Ref } from 'react';

export type MediaCarouselHandle = {
    goTo: (index: number) => void;
};

export default function MediaCarousel({
    images,
    ref,
    onIndexChange,
    aspect,
    className,
    spacing,
}: {
    images: { light: string; dark: string }[];
    spacing: number;
    ref?: Ref<MediaCarouselHandle>;
    onIndexChange?: (index: number) => void;
    aspect?: 'video' | '3:2';
    className?: string;
}) {
    const [currentIndex, setCurrentIndex] = useState(2);
    const [isResetting, setIsResetting] = useState(false);
    const [isSliding, setIsSliding] = useState(false);

    const count = images.length;

    const move = (direction: 'forward' | 'backward') => {
        if (isSliding) return;
        if (isResetting) return;
        setIsSliding(true);

        if (direction === 'forward') {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        } else {
            setCurrentIndex((prevIndex) => prevIndex - 1);
        }

        setTimeout(() => {
            setIsSliding(false);
        }, 500);
    };

    const goTo = (index: number) => {
        if (count === 0) return;

        const target = ((index % count) + count) % count;
        if (target + 2 === currentIndex) return;

        setIsSliding(true);
        setCurrentIndex(target + 2);

        setTimeout(() => {
            setIsSliding(false);
        }, 500);
    };

    useImperativeHandle(ref, () => ({ goTo }));

    const activeIndex = count > 0 ? (((currentIndex - 2) % count) + count) % count : 0;

    useEffect(() => {
        onIndexChange?.(activeIndex);
    }, [activeIndex, onIndexChange]);

    useEffect(() => {
        if (count <= 1) return;

        const interval = setInterval(() => {
            move('forward');
        }, 5000);

        return () => clearInterval(interval);
    }, [count, isSliding]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (currentIndex >= count + 2) {
                setCurrentIndex(2);
                setIsResetting(true);
            } else if (currentIndex < 2) {
                setCurrentIndex(count + 1);
                setIsResetting(true);
            }

            setTimeout(() => {
                setIsResetting(false);
            }, 100);
        }, 500);

        return () => clearTimeout(timeout);
    }, [currentIndex, count]);

    const slides = images.length > 0 ? [images[(count - 2) % count], images[(count - 1) % count], ...images, images[0], images[1]] : [];

    return (
        <div className={`relative w-full max-w-5xl mx-auto ${aspect === '3:2' ? 'aspect-3/2' : 'aspect-video'} ${className ?? ''}`}>
            {slides.length > 0 &&
                slides.map((image, index) => (
                    <button
                        onClick={() => {
                            if (index === currentIndex + 1) {
                                move('forward');
                            } else if (index === currentIndex - 1) {
                                move('backward');
                            }
                        }}
                        key={index}
                        style={{ transform: `translateX(${(index - currentIndex) * spacing}rem)` }}
                        className={`flex absolute inset-0 select-none justify-center ${Math.abs(index - currentIndex) === 1 ? 'scale-90 brightness-50' : 'scale-100 cursor-default!'} ${isResetting ? 'transition-none' : 'transition-all'} duration-500`}
                    >
                        <div
                            className={`w-full h-full shrink-0 relative bg-primary/35 light:bg-primary-light/35 border border-white/10 light:border-white/15 backdrop-blur-[32px] rounded-xl shadow-[0px_6px_15px_0px_rgba(0,0,0,0.15)] light:shadow-[0px_6px_15px_0px_rgba(0,0,0,0.10)]`}
                        >
                            <AnimatePresence>
                                {Math.abs(index - currentIndex) === 1 && (
                                    <>
                                        {index - currentIndex > 0 ? (
                                            <motion.svg
                                                initial={{ opacity: isResetting ? 1 : 0 }}
                                                animate={{ opacity: 1, transition: { duration: 0.3, ease: [0.39, 0.21, 0.12, 0.96] } }}
                                                exit={{ opacity: 0, transition: { duration: 0.3, ease: [0.39, 0.21, 0.12, 0.96] } }}
                                                className={`w-20 text-white absolute ${index - currentIndex > 0 ? 'left-15' : 'right-15'}`}
                                                width="100%"
                                                height="100%"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </motion.svg>
                                        ) : (
                                            <motion.svg
                                                initial={{ opacity: isResetting ? 1 : 0 }}
                                                animate={{ opacity: 1, transition: { duration: 0.3, ease: [0.39, 0.21, 0.12, 0.96] } }}
                                                exit={{ opacity: 0, transition: { duration: 0.3, ease: [0.39, 0.21, 0.12, 0.96] } }}
                                                className={`w-20 text-white absolute ${index - currentIndex > 0 ? 'left-15' : 'right-15'}`}
                                                width="100%"
                                                height="100%"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path d="M20 12H4M4 12L10 18M4 12L10 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </motion.svg>
                                        )}
                                    </>
                                )}
                            </AnimatePresence>
                            <img draggable="false" src={image.light} alt="Carousel light" className="inset-0 h-full w-full object-cover rounded-xl -z-20 light:block hidden" />
                            <img draggable="false" src={image.dark} alt="Carousel dark" className="inset-0 h-full w-full object-cover rounded-xl -z-20 light:hidden" />
                        </div>
                    </button>
                ))}
        </div>
    );
}
