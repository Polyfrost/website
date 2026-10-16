export default function ShowcaseButton({ icon, label, activeIndex, targetIndex, goTo }: { icon: React.ReactNode; label: string; activeIndex: number; targetIndex: number; goTo: (index: number) => void }) {
    return (
        <button type="button" onClick={() => goTo(targetIndex)} className="group flex flex-col gap-2 items-center">
            {icon}
            <p className={`${activeIndex === targetIndex ? 'text-white light:text-black' : 'text-white/75 light:text-black/75 group-hover:text-white group-hover:light:text-black'} duration-300 sm:text-base text-sm`}>{label}</p>
            <div className={`h-0.5 ${activeIndex === targetIndex ? 'w-3/5' : 'w-0'} transition-all duration-300 rounded-md bg-blue`} />
        </button>
    );
}
