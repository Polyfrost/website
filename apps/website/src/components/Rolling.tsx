import { AnimatePresence, motion } from 'framer-motion';
import { Children, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

export default function Rolling({ children, activeIndex, autoScroll, className, delay }: { children: ReactNode; activeIndex?: number; autoScroll?: boolean; className?: string; delay?: number }) {
    const [currentIndex, setCurrentIndex] = useState(activeIndex ?? 0);

    const items = Children.toArray(children);

    useEffect(() => {
        setCurrentIndex(activeIndex ?? 0);
    }, [activeIndex]);

    useEffect(() => {
        if (autoScroll) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [autoScroll, items.length]);

    return (
        <div className={`${className ?? ''}`}>
            <div className="relative">
                <AnimatePresence>
                    {items[currentIndex] && (
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)', transition: { delay: delay ?? 0.2, duration: 0.5, ease: [0.39, 0.21, 0.12, 0.96] } }}
                            exit={{ opacity: 0, y: -25, filter: 'blur(10px)', position: 'absolute', pointerEvents: 'none', transition: { duration: 0.5, ease: [0.39, 0.21, 0.12, 0.96] } }}
                            className="top-0 left-0 w-full"
                        >
                            {items[currentIndex]}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
