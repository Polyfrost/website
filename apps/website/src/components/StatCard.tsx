import { motion } from 'framer-motion';
import Logo from './Logo';
import PerformanceIcon from './icons/Performance';

export default function StatCard({ label, compValue, polyValue, compProgressBar, polyProgressBar }: { label: string; compValue: string; polyValue: string; compProgressBar: number; polyProgressBar: number }) {
    return (
        <div className="bg-primary/50 light:bg-primary-light/50 w-full flex flex-col p-6 gap-6 rounded-xl border border-white/10 light:border-white/15 backdrop-blur-[32px] shadow-[0px_6px_15px_0px_rgba(0,0,0,0.15)] light:shadow-[0px_6px_15px_0px_rgba(0,0,0,0.10)]">
            <div className="flex flex-row gap-5 items-center">
                <PerformanceIcon className="sm:w-6 sm:h-6 w-5 h-5" />
                <h2 className="text-2xl">{label}</h2>
            </div>
            <div className="flex flex-col gap-7 w-full">
                <div className="flex sm:flex-row flex-col md:gap-5 gap-2 items-center">
                    <div className="flex md:w-50 sm:w-30 w-50 shrink-0">
                        <p className="md:text-xl sm:text-lg text-xl font-light text-white/75 light:text-black/75 sm:text-right text-center w-full whitespace-nowrap">Lunar Client</p>
                    </div>
                    <div className="flex flex-col w-full bg-primary light:bg-primary-light sm:h-7 h-6 rounded-full">
                        <motion.div
                            initial={{ width: `0%` }}
                            whileInView={{ width: `${compProgressBar * 100}%`, transition: { duration: 1.5, ease: [0.39, 0.21, 0.12, 0.96] } }}
                            viewport={{ amount: 0.5, once: true }}
                            className="bg-[#424C59] light:bg-[#8C99AA] sm:h-7 h-6 rounded-full"
                            style={{ width: `${compProgressBar * 100}%` }}
                        />
                    </div>
                    <div className="flex w-18 shrink-0">
                        <p className="text-xl font-light text-white/75 light:text-black/75 whitespace-nowrap">{compValue}</p>
                    </div>
                </div>
                <div className="flex sm:flex-row flex-col md:gap-5 gap-2 items-center">
                    <Logo className="md:w-50 sm:w-30 w-50 sm:self-end self-center shrink-0" />
                    <div className="flex flex-col w-full bg-primary light:bg-primary-light sm:h-7 h-6 rounded-full">
                        <motion.div
                            initial={{ width: `0%` }}
                            whileInView={{ width: `${polyProgressBar * 100}%`, transition: { duration: 1.5, ease: [0.39, 0.21, 0.12, 0.96] } }}
                            viewport={{ amount: 0.5, once: true }}
                            className="bg-blue sm:h-7 h-6 rounded-full"
                        />
                    </div>
                    <div className="flex w-18 shrink-0 sm:justify-start justify-center">
                        <p className="text-xl whitespace-nowrap">{polyValue}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
