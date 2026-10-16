import { createFileRoute, Link } from '@tanstack/react-router';
import { modpackUrl, prismInstanceUrl } from '#/components/DownloadDropdown';
import CubeIcon from '#/components/icons/Cube';
import DownloadIcon from '#/components/icons/Download';
import GridIcon from '#/components/icons/Grid';
import LaunchIcon from '#/components/icons/Launch';
import LinkButton from '#/components/LinkButton';

export const Route = createFileRoute('/projects/oneclient_/prism')({
    component: Prism,
    head: () => ({
        meta: [
            {
                title: 'Install OneClient in Prism Launcher',
            },
            {
                name: 'description',
                content: 'Install the OneClient 1.8.9 mods in Prism Launcher or MultiMC.',
            },
        ],
    }),
});

const cardClassName =
    'bg-primary/50 light:bg-primary-light/50 w-full rounded-xl border flex flex-col gap-3 p-6 border-white/10 light:border-white/15 backdrop-blur-[32px] shadow-[0px_6px_15px_0px_rgba(0,0,0,0.15)] light:shadow-[0px_6px_15px_0px_rgba(0,0,0,0.10)] animate-enter';
const textClassName = 'text-white/75 light:text-black/75 font-light';
const linkClassName = 'text-white/90 light:text-black/90 underline decoration-white/30 light:decoration-black/30 hover:decoration-white light:hover:decoration-black underline-offset-4 duration-300';

function Prism() {
    return (
        <section className="relative">
            <div className="min-h-screen items-center flex flex-col sm:gap-10 gap-6 px-4 pb-30">
                <div className="absolute h-482 w-482 -translate-y-36 -z-10 glow" />
                <h1 className="sm:text-5xl text-4xl font-light max-w-3xl text-center pt-36 animate-enter">
                    Install OneClient in <span className="font-medium">Prism Launcher</span>
                </h1>
                <p className="sm:text-lg text-base font-light max-w-3xl text-center animate-enter" style={{ animationDelay: '0.2s' }}>
                    Use the OneClient mods for Minecraft 1.8.9 in Prism Launcher or MultiMC. The instance has Ornithe and every mod in it already, and it needs Java 25. Import it again when you want newer mods.
                </p>
                <div className="flex flex-col items-center gap-4 sm:w-fit w-full">
                    <LinkButton
                        icon={<DownloadIcon className="sm:w-6 sm:h-6 w-5 h-5 text-white" />}
                        label="Download instance"
                        color="blue"
                        className="sm:py-1.5 py-1 px-2 sm:w-fit w-full"
                        labelClassName="sm:text-lg! text-base!"
                        href={prismInstanceUrl}
                        delay={0.3}
                    />
                    <p className="text-sm font-light text-white/60 light:text-black/60 text-center animate-enter" style={{ animationDelay: '0.4s' }}>
                        <Link to="/projects/oneclient" className={linkClassName}>
                            Back to OneClient
                        </Link>
                    </p>
                </div>
                <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 max-w-6xl w-full">
                    <div className={cardClassName} style={{ animationDelay: '0.4s' }}>
                        <div className="flex flex-row gap-4 items-center">
                            <LaunchIcon className="h-6 w-6 shrink-0" />
                            <h2 className="text-xl">Prism Launcher</h2>
                        </div>
                        <p className={textClassName}>Prism Launcher imports from a link, so you can skip the download.</p>
                        <ol className={`${textClassName} list-decimal pl-5 flex flex-col gap-1`}>
                            <li>Click "Add Instance"</li>
                            <li>Open the "Import" tab</li>
                            <li>Paste the link and click "OK"</li>
                        </ol>
                        <p className={textClassName}>The link to paste:</p>
                        <code className="bg-black/20 light:bg-white/40 rounded-lg border border-white/10 light:border-white/15 p-3 text-sm break-all select-all">{prismInstanceUrl}</code>
                    </div>
                    <div className={cardClassName} style={{ animationDelay: '0.5s' }}>
                        <div className="flex flex-row gap-4 items-center">
                            <CubeIcon className="h-6 w-6 shrink-0" />
                            <h2 className="text-xl">MultiMC</h2>
                        </div>
                        <p className={textClassName}>Works in MultiMC and the launchers based on it.</p>
                        <ol className={`${textClassName} list-decimal pl-5 flex flex-col gap-1`}>
                            <li>Download the instance</li>
                            <li>Click "Add Instance"</li>
                            <li>Pick "Import from zip" and choose the file</li>
                        </ol>
                        <div className="flex mt-auto pt-2">
                            <LinkButton icon={<DownloadIcon className="w-4.5 h-4.5 text-white" />} label="Download .zip" color="blue" className="w-fit" href={prismInstanceUrl} />
                        </div>
                    </div>
                    <div className={cardClassName} style={{ animationDelay: '0.6s' }}>
                        <div className="flex flex-row gap-4 items-center">
                            <GridIcon className="h-6 w-6 shrink-0" />
                            <h2 className="text-xl">Want another Minecraft version? (1.21.1+)</h2>
                        </div>
                        <p className={textClassName}>
                            You can just use the <code>.mrpack</code> for those. The OneClient modpack is on Modrinth, and Prism Launcher can import it.
                        </p>
                        <div className="flex mt-auto pt-2">
                            <LinkButton label="Get it on Modrinth" color="primary" className="w-fit" href={modpackUrl} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
