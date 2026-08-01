import { motion } from 'framer-motion';

export default function InfoCard({ icon, label, description, delay }: { icon: React.ReactNode; label: string; description: string; delay?: number }) {
    return (
        <motion.div
            className="bg-primary/50 light:bg-primary-light/50 w-full rounded-xl border flex flex-col gap-2 border-white/10 light:border-white/15 backdrop-blur-[32px] shadow-[0px_6px_15px_0px_rgba(0,0,0,0.15)] light:shadow-[0px_6px_15px_0px_rgba(0,0,0,0.10)]"
            initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)', transition: { delay: delay, duration: 0.5, ease: [0.39, 0.21, 0.12, 0.96] } }}
            viewport={{ amount: 0.5, once: true }}
        >
            <div className="flex flex-col px-6 pt-6 pb-2 gap-1 h-full">
                <div className="flex flex-row gap-6 items-center w-fit">
                    {icon}
                    <h2 className="text-xl whitespace-nowrap">{label}</h2>
                </div>
                <p className="text-white/75 light:text-black/75 font-light mt-2">{description}</p>
            </div>
            <div className={`bg-blue rounded-b-xl h-3`} />
        </motion.div>
    );
}
