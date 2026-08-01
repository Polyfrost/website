import { motion } from 'framer-motion';

export default function LinkButton({
    icon,
    label,
    color,
    className,
    href,
    labelClassName,
    addedWidth,
    delay,
}: {
    icon?: React.ReactNode;
    label?: string;
    color: 'primary' | 'blue' | 'red';
    className: string;
    href: string;
    labelClassName?: string;
    addedWidth?: string;
    delay?: number;
}) {
    const buttonColor = () => {
        switch (color) {
            case 'primary':
                return 'bg-primary/50 light:bg-primary-light/50 hover:brightness-110 duration-300 border-white/10 light:border-white/15';
            case 'blue':
                return 'bg-blue border-blue-400/30 hover:brightness-110 duration-300';
            case 'red':
                return 'bg-red border-red-400/30 hover:brightness-110 duration-300';
        }
    };

    return (
        <>
            {delay ? (
                <motion.div initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)', transition: { delay: delay, duration: 0.5, ease: [0.39, 0.21, 0.12, 0.96] } }} className={`flex w-full`}>
                    <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className={`${buttonColor()} ${className ?? ''} disabled:opacity-50 disabled:cursor-not-allowed border relative rounded-lg shadow-[0px_6px_15px_0px_rgba(0,0,0,0.15)] light:shadow-[0px_6px_15px_0px_rgba(0,0,0,0.10)] select-none`}
                        style={{ paddingRight: addedWidth, paddingLeft: addedWidth }}
                    >
                        {label ? (
                            <div className="flex flex-row items-center justify-center gap-2 px-3 py-1">
                                {icon && icon}
                                {label && <p className={`${color === 'primary' ? 'text-white light:text-black' : 'text-white'} text-sm leading-6 whitespace-nowrap ${labelClassName ?? ''}`}>{label}</p>}
                            </div>
                        ) : (
                            <div className="flex p-1.5">{icon && icon}</div>
                        )}
                    </a>
                </motion.div>
            ) : (
                <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className={`${buttonColor()} ${className} disabled:opacity-50 disabled:cursor-not-allowed border relative rounded-lg shadow-[0px_6px_15px_0px_rgba(0,0,0,0.15)] light:shadow-[0px_6px_15px_0px_rgba(0,0,0,0.10)] select-none`}
                    style={{ paddingRight: addedWidth, paddingLeft: addedWidth }}
                >
                    {label ? (
                        <div className="flex flex-row items-center justify-center gap-2 px-3 py-1">
                            {icon && icon}
                            {label && <p className={`${color === 'primary' ? 'text-white light:text-black' : 'text-white'} text-sm leading-6 whitespace-nowrap ${labelClassName ?? ''}`}>{label}</p>}
                        </div>
                    ) : (
                        <div className="flex p-1.5">{icon && icon}</div>
                    )}
                </a>
            )}
        </>
    );
}
