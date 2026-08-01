import { useTheme } from 'next-themes';
import { useState } from 'react';
import Button from './Button';
import BurgerIcon from './icons/Burger';
import NightIcon from './icons/Night';
import Logo from './Logo';
import DayIcon from './icons/Day';
import { useRouter } from '@tanstack/react-router';
import BagIcon from './icons/Bag';
import DownloadIcon from './icons/Download';
import SparkleIcon from './icons/Sparkle';
import GridIcon from './icons/Grid';
import PerformanceIcon from './icons/Performance';
import DiamondIcon from './icons/Diamond';
import LaunchIcon from './icons/Launch';
import LinkButton from './LinkButton';
import { latestReleaseUrl, type Download } from './DownloadDropdown';

export default function Navbar({ atTop, featured }: { atTop: boolean; featured?: Download }) {
    const [extended, setExtended] = useState(false);
    const { resolvedTheme, setTheme } = useTheme();
    const router = useRouter();

    const toggleTheme = () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');

    const handleClickScroll = (id: string, header: number) => {
        const element = document.getElementById(id);
        if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: elementPosition - header,
                behavior: 'smooth',
            });
        }
    };

    return (
        <header
            className={`fixed z-150 top-0 w-full transition-all duration-300 ease-out ${atTop && !extended ? `bg-transparent border-b border-b-transparent min-[1350px]:py-12 py-8` : 'bg-primary/45 light:bg-primary-light/45 border-b border-b-white/10 light:border-b-white/15 py-6 backdrop-blur-[32px] shadow-[0px_6px_15px_0px_rgba(0,0,0,0.15)] light:shadow-[0px_6px_15px_0px_rgba(0,0,0,0.10)]'}`}
        >
            <div className="flex justify-center">
                <div className={`max-w-7xl w-full flex flex-col transition-all duration-300 ease-out min-[1350px]:px-0 px-4 min-[1350px]:gap-0 gap-2`}>
                    <div className="relative flex flex-row items-center justify-between gap-8">
                        <button onClick={() => router.navigate({ href: '/' })} className="flex z-10">
                            <Logo className="w-auto h-8 self-center" />
                        </button>
                        <div className="absolute w-full justify-center flex-row gap-8 min-[1350px]:flex hidden">
                            <button onClick={() => handleClickScroll('features', 100)} className="group flex flex-row gap-2 items-center">
                                <SparkleIcon className="w-4 h-4 text-white/75 light:text-black/75 group-hover:text-white group-hover:light:text-black duration-300" />
                                <span className="text-white/75 light:text-black/75 group-hover:text-white group-hover:light:text-black duration-300 text-sm font-medium">Features</span>
                            </button>
                            <button onClick={() => handleClickScroll('mods', 0)} className="group flex flex-row gap-2 items-center">
                                <GridIcon className="w-4 h-4 text-white/75 light:text-black/75 group-hover:text-white group-hover:light:text-black duration-300" />
                                <span className="text-white/75 light:text-black/75 group-hover:text-white group-hover:light:text-black duration-300 text-sm font-medium">Mods</span>
                            </button>
                            <button onClick={() => handleClickScroll('performance', 0)} className="group flex flex-row gap-2 items-center">
                                <PerformanceIcon className="w-4 h-4 text-white/75 light:text-black/75 group-hover:text-white group-hover:light:text-black duration-300" />
                                <span className="text-white/75 light:text-black/75 group-hover:text-white group-hover:light:text-black duration-300 text-sm font-medium">Performance</span>
                            </button>
                            <button onClick={() => handleClickScroll('cosmetics', 0)} className="group flex flex-row gap-2 items-center">
                                <DiamondIcon className="w-4 h-4 text-white/75 light:text-black/75 group-hover:text-white group-hover:light:text-black duration-300" />
                                <span className="text-white/75 light:text-black/75 group-hover:text-white group-hover:light:text-black duration-300 text-sm font-medium">Cosmetics</span>
                            </button>
                            <button onClick={() => handleClickScroll('launcher', 0)} className="group flex flex-row gap-2 items-center">
                                <LaunchIcon className="w-4 h-4 text-white/75 light:text-black/75 group-hover:text-white group-hover:light:text-black duration-300" />
                                <span className="text-white/75 light:text-black/75 group-hover:text-white group-hover:light:text-black duration-300 text-sm font-medium">Launcher</span>
                            </button>
                        </div>
                        <div className="flex-row gap-3 min-[1350px]:flex hidden z-10">
                            <Button
                                icon={
                                    <>
                                        <NightIcon className="w-4.5 h-4.5 light:hidden" />
                                        <DayIcon className="w-4.5 h-4.5 hidden light:block" />
                                    </>
                                }
                                color="primary"
                                className="w-fit"
                                onClick={toggleTheme}
                            />
                            <LinkButton icon={<BagIcon className="w-4.5 h-4.5" />} label="Store" color="primary" className="w-fit" href="https://store.polyfrost.org" />
                            <LinkButton icon={<DownloadIcon className="w-4.5 h-4.5 text-white" />} label="Download" color="blue" className="w-fit" href={featured?.url ?? latestReleaseUrl} />
                        </div>
                        <button className="min-[1350px]:hidden block" onClick={() => setExtended(!extended)}>
                            <BurgerIcon className="w-8 h-8" />
                        </button>
                    </div>
                    {extended && (
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-row w-full gap-3 pt-2">
                                <Button
                                    icon={
                                        <>
                                            <NightIcon className="w-4.5 h-4.5 light:hidden" />
                                            <DayIcon className="w-4.5 h-4.5 hidden light:block" />
                                        </>
                                    }
                                    color="primary"
                                    className="w-fit"
                                    onClick={toggleTheme}
                                />
                                <LinkButton icon={<BagIcon className="w-4.5 h-4.5" />} label="Store" color="primary" className="w-full" href="https://store.polyfrost.org" />
                                <LinkButton icon={<DownloadIcon className="w-4.5 h-4.5 text-white" />} label="Download" color="blue" className="w-full" href={featured?.url ?? latestReleaseUrl} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
