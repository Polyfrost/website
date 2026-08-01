import { AnimatePresence, motion } from 'framer-motion';

export default function RollingText({ strings, activeIndex, wrapperClass, textClass, delay }: { strings: string[]; activeIndex: number; wrapperClass?: string; textClass?: string; delay?: number }) {
    return (
        <>
            {strings.map((title, index) => (
                <AnimatePresence key={index}>
                    {activeIndex === index && (
                        <motion.div
                            initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)', transition: { delay: delay ?? 0.2, duration: 0.5, ease: [0.39, 0.21, 0.12, 0.96] } }}
                            exit={{ opacity: 0, y: -25, filter: 'blur(10px)', transition: { duration: 0.5, ease: [0.39, 0.21, 0.12, 0.96] } }}
                            className={`${wrapperClass ?? ''}`}
                        >
                            <p className={`${index === activeIndex ? 'block' : 'hidden'} ${textClass ?? ''}`}>{title}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            ))}
        </>
    );
}
