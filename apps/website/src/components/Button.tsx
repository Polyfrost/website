export default function Button({
    icon,
    label,
    color,
    className,
    labelClassName,
    disabled,
    addedWidth,
    delay,
    onClick,
}: {
    icon?: React.ReactNode;
    label?: string;
    color: 'primary' | 'blue' | 'red';
    className: string;
    labelClassName?: string;
    disabled?: boolean;
    addedWidth?: string;
    delay?: number;
    onClick: () => void;
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

    const button = (
        <button
            onClick={onClick}
            disabled={disabled}
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
        </button>
    );

    if (!delay) return button;

    return (
        <div className="flex w-full animate-enter" style={{ animationDelay: `${delay}s` }}>
            {button}
        </div>
    );
}
