export default function ModCard({ icon, label, on }: { icon: React.ReactNode; label: string; on?: boolean }) {
    return (
        <div className="relative bg-linear-to-b from-primary/50 to-primary/30 light:from-primary-light/50 light:to-primary-light/30 rounded-xl border flex flex-col w-64 h-37 border-white/10 light:border-white/15 backdrop-blur-[32px] shadow-[0px_6px_15px_0px_rgba(0,0,0,0.15)] light:shadow-[0px_6px_15px_0px_rgba(0,0,0,0.10)]">
            <div className="absolute bg-poly-blue rounded-full h-2 w-2 animate-ping right-3 top-3" />
            <div className="absolute bg-poly-blue rounded-full h-2 w-2 right-3 top-3" />
            <div className="m-auto">{icon}</div>
            <div className={`${on ? 'bg-poly-blue' : 'bg-primary/50 light:bg-primary-light/50 border-t border-t-white/10 light:border-t-white/15'} rounded-b-xl p-1.5 w-full`}>
                <p className={`text-center font-medium ${on ? 'text-white' : 'text-white light:text-black'}`}>{label}</p>
            </div>
        </div>
    );
}
