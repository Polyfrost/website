import { motion } from 'framer-motion';
import Icon from './Icon';
import CPU from './icons/CPU';
import GPU from './icons/GPU';
import Ram from './icons/Ram';

export default function StatCard({ reviewer, pfp, fps, oldFps, oldIcon, cpu, gpu, ram }: { reviewer: string; pfp: string; fps: number; oldFps: number; oldIcon: string; cpu: string; gpu?: string; ram: string }) {
    const leadMin = 0.78;
    const leadMax = 0.95;
    const minFill = 0.08;

    const top = Math.max(fps, oldFps, 1);
    const closeness = Math.min(fps, oldFps) / top;
    const max = top / (leadMax - (leadMax - leadMin) * closeness);
    const fill = (value: number) => `${Math.min(1, Math.max(minFill, value / max)) * 100}%`;

    return (
        <div className="bg-primary/50 light:bg-primary-light/50 w-full flex flex-col p-4 gap-3 rounded-xl border border-white/10 light:border-white/15 backdrop-blur-[32px] shadow-[0px_6px_15px_0px_rgba(0,0,0,0.15)] light:shadow-[0px_6px_15px_0px_rgba(0,0,0,0.10)]">
            <div className="flex flex-row gap-2 items-center">
                <img src={pfp} alt={`${reviewer} avatar`} className="rounded-full h-6 w-6 border border-white/10 light:border-white/15" />
                <h1 className="brightness-90">{reviewer}</h1>
            </div>
            <div className="flex flex-col items-center gap-2 justify-center">
                <div className="flex flex-row gap-2 w-full items-center">
                    <Icon className="h-7 min-w-7" />
                    <div className="flex flex-col w-full bg-primary light:bg-primary-light h-3 rounded-full">
                        <motion.div initial={{ width: `0%` }} whileInView={{ width: fill(fps), transition: { duration: 1.5, ease: [0.39, 0.21, 0.12, 0.96] } }} viewport={{ amount: 0.5, once: true }} className="bg-blue h-3 rounded-full" />
                    </div>
                    <span className="text-sm brightness-75 whitespace-nowrap">{fps} FPS</span>
                </div>
                <div className="flex flex-row gap-2 w-full items-center">
                    <img src={oldIcon} alt={`Compared client icon`} className="h-7 w-7" />
                    <div className="flex flex-col w-full bg-primary light:bg-primary-light h-3 rounded-full">
                        <motion.div
                            initial={{ width: `0%` }}
                            whileInView={{ width: fill(oldFps), transition: { duration: 1.5, ease: [0.39, 0.21, 0.12, 0.96] } }}
                            viewport={{ amount: 0.5, once: true }}
                            className="bg-[#424C59] light:bg-[#8C99AA] h-3 rounded-full"
                        />
                    </div>
                    <span className="text-sm brightness-75 whitespace-nowrap">{oldFps} FPS</span>
                </div>
            </div>
            <div className="flex flex-col">
                <p className="flex items-center gap-1 brightness-75 text-sm">
                    <CPU className="h-4 w-4" />
                    <span>{cpu}</span>
                </p>
                {gpu && (
                    <p className="flex items-center gap-1 brightness-75 text-sm">
                        <GPU className="h-4 w-4" />
                        <span>{gpu}</span>
                    </p>
                )}
                <p className="flex items-center gap-1 brightness-75 text-sm">
                    <Ram className="h-4 w-4" />
                    <span>{ram}</span>
                </p>
            </div>
        </div>
    );
}
