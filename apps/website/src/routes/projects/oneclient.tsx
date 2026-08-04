import { createFileRoute } from '@tanstack/react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useRef, useState } from 'react';
import DownloadDropdown, { getDownloads, noDownloads } from '#/components/DownloadDropdown';
import InfoCard from '#/components/InfoCard';
import BagIcon from '#/components/icons/Bag';
import ChecklistIcon from '#/components/icons/Checklist';
import ClickIcon from '#/components/icons/Click';
import ColorIcon from '#/components/icons/Color';
import CubeIcon from '#/components/icons/Cube';
import DollarIcon from '#/components/icons/Dollar';
import FastIcon from '#/components/icons/Fast';
import GitHubIcon from '#/components/icons/GitHub';
import HUDIcon from '#/components/icons/HUD';
import LightningIcon from '#/components/icons/Lightning';
import LineGraphIcon from '#/components/icons/LineGraph';
import SettingsIcon from '#/components/icons/Settings';
import SmileIcon from '#/components/icons/Smile';
import StarIcon from '#/components/icons/Star';
import UIIcon from '#/components/icons/UI';
import UsersIcon from '#/components/icons/Users';
import Marquee from '#/components/Marquee';
import MediaCarousel, { type MediaCarouselHandle } from '#/components/MediaCarousel';
import ModCard from '#/components/ModCard';
import RollingText from '#/components/RollingText';
import ShowcaseButton from '#/components/ShowcaseButton';
import StatCard from '#/components/StatCard';
import LinkButton from '#/components/LinkButton';
import { createServerFn } from '@tanstack/react-start';
import { createCache } from '#/lib/cache';

const noMods = { arr1: [], arr2: [] };

const loadMods = createCache(async (): Promise<any[]> => {
    const response = await fetch('https://data-v2.polyfrost.org/oneclient/mods.json');

    if (!response.ok) throw new Error(`Polyfrost data responded ${response.status}`);

    const mods = await response.json();
    if (!Array.isArray(mods?.mods)) throw new Error('Malformed mods.json');

    return mods.mods;
});

const getMods = createServerFn({ method: 'GET' }).handler(async () => {
    const mods = await loadMods();
    if (!mods) return noMods;

    const filteredMods = mods.filter((mod: any) => mod.priority > 0).map((mod: any) => ({ ...mod, on: Math.random() < 0.5 }));

    const remaining = 50 - filteredMods.length;
    if (remaining > 0) {
        const additionalMods = mods.filter((mod: any) => mod.priority === 0).map((mod: any) => ({ ...mod, on: Math.random() < 0.5 }));

        for (let i = additionalMods.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [additionalMods[i], additionalMods[j]] = [additionalMods[j], additionalMods[i]];
        }

        filteredMods.push(...additionalMods.slice(0, remaining));
    }

    return { arr1: filteredMods.slice(0, 25), arr2: filteredMods.slice(25, 50) };
});

export const Route = createFileRoute('/projects/oneclient')({
    component: Oneclient,
    // Neither server fn rejects on an upstream failure, but the call itself can still
    // fail in transit on a client-side navigation — the page renders without either.
    loader: () =>
        Promise.all([getDownloads().catch(() => noDownloads), getMods().catch(() => noMods)]).then(([downloads, mods]) => ({
            downloads,
            mods,
        })),
});

function Oneclient() {
    const carousel = useRef<MediaCarouselHandle>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const hero = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const el = hero.current;
        if (!el) return;

        gsap.registerPlugin(ScrollTrigger);

        const animation = gsap.fromTo(
            el,
            { rotateX: 6 },
            {
                rotateX: 0,
                ease: 'none',
                scrollTrigger: {
                    start: 0,
                    end: () => window.innerHeight * 0.6,
                    scrub: 0.5,
                    invalidateOnRefresh: true,
                },
            }
        );

        return () => {
            animation.scrollTrigger?.kill();
            animation.kill();
            gsap.set(el, { clearProps: 'transform' });
        };
    }, []);

    return (
        <>
            <section className="relative">
                <div className="min-h-screen justify-center items-center flex flex-col sm:gap-10 gap-6 px-4">
                    <div className="absolute h-482 w-482 -translate-y-36 -z-10 glow" />
                    <div className="absolute h-482 w-482 translate-x-184 translate-y-209 -z-10 glow" />
                    <div className="absolute h-482 w-482 -translate-x-266 translate-y-334 -z-10 glow" />
                    <div className="absolute h-482 w-482 translate-x-250 translate-y-600 -z-10 glow" />
                    <div className="absolute h-482 w-482 -translate-x-300 translate-y-800 -z-10 glow" />
                    <div className="absolute h-482 w-482 translate-x-150 translate-y-1000 -z-10 glow" />
                    <div className="absolute h-482 w-482 -translate-x-275 translate-y-1300 -z-10 glow" />
                    <div className="absolute h-482 w-482 translate-x-310 translate-y-1500 -z-10 glow" />
                    <div className="absolute h-482 w-482 translate-y-1750 -z-10 glow" />
                    <h1 className="sm:text-5xl text-4xl font-light max-w-3xl text-center pt-36 animate-enter">
                        The one client <span className="font-medium">you&apos;ll ever need.</span>
                    </h1>
                    <p className="sm:text-lg text-base font-light max-w-3xl text-center animate-enter" style={{ animationDelay: '0.2s' }}>
                        OneClient ships the most bleeding-edge mods, while being 100% open source and community-driven.
                    </p>
                    <div className="flex sm:flex-row flex-col gap-4 items-center sm:w-fit w-full">
                        <DownloadDropdown {...Route.useLoaderData().downloads} className="sm:py-1.5 py-1 px-2 sm:w-fit w-full" labelClassName="sm:text-lg! text-base!" color="blue" delay={0.3} />
                        <LinkButton
                            icon={<GitHubIcon className="sm:w-6 sm:h-6 w-5 h-5" />}
                            label="View on GitHub"
                            color="primary"
                            className="sm:py-1.5 py-1 px-2 sm:w-fit w-full"
                            labelClassName="sm:text-lg! text-base!"
                            href="https://github.com/Polyfrost"
                            delay={0.4}
                        />
                    </div>
                    <div className="perspective-normal transform-3d animate-hover max-w-5xl">
                        <div ref={hero} className="animate-fade" style={{ animationDelay: '0.5s' }}>
                            <img src="/heroimagelight.png" alt="Hero light" className="light:block hidden" />
                            <img src="/heroimage.png" alt="Hero dark" className="light:hidden" />
                        </div>
                    </div>
                </div>
            </section>
            <section id="features" className="relative">
                <div className="bg-primary/45 light:bg-primary-light/45 border-y border-y-white/10 light:border-y-white/15 py-12 backdrop-blur-[32px]">
                    <div className="justify-center items-center flex flex-col gap-12 px-4">
                        <div className="flex flex-row max-w-5xl w-full mx-auto justify-between gap-2">
                            <ShowcaseButton
                                icon={<UIIcon className="sm:w-8 sm:h-8 w-6 h-6 text-white/75 light:text-black/75 group-hover:text-white group-hover:light:text-black duration-300" />}
                                label="User Interface"
                                targetIndex={0}
                                activeIndex={activeIndex}
                                goTo={(index) => carousel.current?.goTo(index)}
                            />
                            <ShowcaseButton
                                icon={<ColorIcon className="sm:w-8 sm:h-8 w-6 h-6 text-white/75 light:text-black/75 group-hover:text-white group-hover:light:text-black duration-300" />}
                                label="UI Themes"
                                targetIndex={1}
                                activeIndex={activeIndex}
                                goTo={(index) => carousel.current?.goTo(index)}
                            />
                            <ShowcaseButton
                                icon={<HUDIcon className="sm:w-8 sm:h-8 w-6 h-6 text-white/75 light:text-black/75 group-hover:text-white group-hover:light:text-black duration-300" />}
                                label="HUD Options"
                                targetIndex={2}
                                activeIndex={activeIndex}
                                goTo={(index) => carousel.current?.goTo(index)}
                            />
                            <ShowcaseButton
                                icon={<SettingsIcon className="sm:w-8 sm:h-8 w-6 h-6 text-white/75 light:text-black/75 group-hover:text-white group-hover:light:text-black duration-300" />}
                                label="Mod Settings"
                                targetIndex={3}
                                activeIndex={activeIndex}
                                goTo={(index) => carousel.current?.goTo(index)}
                            />
                            <ShowcaseButton
                                icon={<CubeIcon className="sm:w-8 sm:h-8 w-6 h-6 text-white/75 light:text-black/75 group-hover:text-white group-hover:light:text-black duration-300" />}
                                label="World Hosting"
                                targetIndex={4}
                                activeIndex={activeIndex}
                                goTo={(index) => carousel.current?.goTo(index)}
                            />
                        </div>
                        <MediaCarousel
                            ref={carousel}
                            onIndexChange={setActiveIndex}
                            aspect="video"
                            spacing={71}
                            images={[
                                { light: '/modslight.png', dark: '/mods.png' },
                                { light: '/themeslight.png', dark: '/themes.png' },
                                { light: '/hudlight.png', dark: '/hud.png' },
                                { light: '/settingslight.png', dark: '/settings.png' },
                                { light: '/hostinglight.png', dark: '/hosting.png' },
                            ]}
                        />
                        <div className="relative h-27 md:flex hidden flex-row justify-between max-w-5xl w-full mx-auto gap-4 px-8">
                            <div className="relative flex flex-col justify-between items-start">
                                <RollingText strings={['Sleek', 'Various', 'Extensive', 'Unified', 'Seamless']} activeIndex={activeIndex} wrapperClass="absolute top-0" textClass="font-light text-4.5xl whitespace-nowrap" delay={0.2} />
                                <RollingText
                                    strings={['User Interface', 'UI Themes', 'HUD Options', 'Mod Settings', 'World Hosting']}
                                    activeIndex={activeIndex}
                                    wrapperClass="absolute bottom-0"
                                    textClass="font-medium text-4.5xl whitespace-nowrap"
                                    delay={0.3}
                                />
                            </div>
                            <RollingText
                                strings={[
                                    'OneClient features a clean and sleek user interface, meticulously designed by actual designers. Optimized for looking good without sacrificing ease of use.',
                                    'OneClient features various themes and customization options, allowing you to personalize the UI to your liking. Change the colors and UI styles to match your preferences.',
                                    'OneClient features extensive HUD options, providing you with all the information you need at a glance. Customize the HUD to show the information you want, where you want it.',
                                    'OneClient features unified mod settings, allowing you to configure all your mods in one place. No more searching through multiple configuration menus.',
                                    'OneClient features seamless world hosting, enabling you to spin up a server in seconds. Host your own world and play with your friends without any hassle.',
                                ]}
                                activeIndex={activeIndex}
                                wrapperClass="max-w-md absolute right-0"
                                textClass="font-light text-lg text-white/75 light:text-black/75 text-left"
                                delay={0.3}
                            />
                        </div>
                    </div>
                </div>
            </section>
            <section id="mods" className="relative">
                <div className="justify-center items-center flex flex-col sm:gap-10 gap-6">
                    <div className="flex flex-col gap-10 px-4">
                        <h1 className="sm:text-5xl text-4xl font-light max-w-3xl text-center pt-36">
                            The Latest & Greatest <span className="font-medium">Mods</span>
                        </h1>
                        <p className="sm:text-lg text-base font-light max-w-3xl text-center">
                            We talk to leading modpack curators to stay ahead on the best performance mods. You can drop in your own mods and configure everything seamlessly right inside the in game UI thanks to OneConfig.
                        </p>
                    </div>
                    <div className="w-full flex flex-col mt-10">
                        <Marquee speed={70}>
                            <div className="flex flex-row gap-5 ml-5 mb-8">
                                {Route.useLoaderData().mods.arr1.map((mod: any, index: number) => (
                                    <ModCard key={index} on={mod.on} icon={<img src={mod.icon} alt={mod.name} className="w-12.5 h-12.5 rounded-[7px]" />} label={mod.name} />
                                ))}
                            </div>
                        </Marquee>
                        <Marquee dir="right" speed={70}>
                            <div className="flex flex-row gap-5 ml-5 mb-8">
                                {Route.useLoaderData().mods.arr2.map((mod: any, index: number) => (
                                    <ModCard key={index} on={mod.on} icon={<img src={mod.icon} alt={mod.name} className="w-12.5 h-12.5 rounded-[7px]" />} label={mod.name} />
                                ))}
                            </div>
                        </Marquee>
                    </div>
                    <div className="flex lg:flex-row flex-col lg:gap-12 gap-4 px-4 mt-8 max-w-6xl w-full">
                        <InfoCard
                            icon={<LightningIcon className="h-6 w-6" />}
                            delay={0.1}
                            label="Always Ahead"
                            description="We talk to leading figures in the modding community and mod creators to ensure we have the best and most up-to-date mods, always ahead of the competition."
                        />
                        <InfoCard
                            icon={<SettingsIcon className="h-6 w-6" />}
                            delay={0.2}
                            label="Unified Configuration"
                            description="Built on top of OneConfig, OneClient bundles the best OneConfig compatible mods, giving you a unified configuration experience for a variety of different mods."
                        />
                        <InfoCard
                            icon={<ChecklistIcon className="h-6 w-6" />}
                            delay={0.3}
                            label="Custom Selection"
                            description="Select the mods you need and leave out the ones you don't. Drop in your own mods and configure everything so it matches your needs and preferences."
                        />
                    </div>
                </div>
            </section>
            <section id="performance" className="relative">
                <div className="justify-center items-center flex flex-col px-4 sm:gap-10 gap-6">
                    <h1 className="sm:text-5xl text-4xl font-light max-w-3xl text-center pt-36">
                        Simply Insane <span className="font-medium">Performance</span>
                    </h1>
                    <p className="sm:text-lg text-base font-light max-w-3xl text-center">
                        Feel the difference in performance with our native launcher and extremely performant client architecture. Real benchmarks. Real testing. Real Performance. The results speak for themselves.
                    </p>
                    <div className="flex flex-col sm:gap-10 gap-6 max-w-6xl w-full">
                        <StatCard label="Game Frames Per Second (FPS)" compValue="88 FPS" polyValue="97 FPS" compProgressBar={0.76} polyProgressBar={0.9} />
                        <StatCard label="Game Startup Time" compValue="1m 02s" polyValue="32s" compProgressBar={0.92} polyProgressBar={0.47} />
                        <StatCard label="Launcher RAM Usage" compValue="727 MB" polyValue="125 MB" compProgressBar={0.88} polyProgressBar={0.2} />
                        <div className="bg-primary/50 light:bg-primary-light/50 w-full p-2 rounded-xl border border-white/10 light:border-white/15 backdrop-blur-[32px] shadow-[0px_6px_15px_0px_rgba(0,0,0,0.15)] light:shadow-[0px_6px_15px_0px_rgba(0,0,0,0.10)]">
                            <p className="text-lg font-light text-white/75 light:text-black/75 text-center">*Testing done on a Lenovo Thinkpad T14S Gen 1 with Ryzen 5 Pro 5640U, Vega Graphics, 16GB RAM</p>
                        </div>
                    </div>
                    <div className="flex lg:flex-row flex-col lg:gap-12 gap-4 max-w-6xl w-full">
                        <InfoCard
                            icon={<FastIcon className="h-6 w-6" />}
                            delay={0.1}
                            label="Extreme Optimization"
                            description="Our focus on extreme optimization ensures the best performance with minimal resource usage. We are constantly improving to bring you the best experience."
                        />
                        <InfoCard
                            icon={<LineGraphIcon className="h-6 w-6" />}
                            delay={0.2}
                            label="Real Benchmarks"
                            description="We provide real benchmarks to showcase the performance of our client compared to the competition. No fake numbers, just real testing on actual hardware."
                        />
                        <InfoCard
                            icon={<UsersIcon className="h-6 w-6" />}
                            delay={0.3}
                            label="Community Driven"
                            description="We actively listen to and work with the community to get feedback on the performance of our client on setups with various hardware and operating system configurations."
                        />
                    </div>
                </div>
            </section>
            <section id="launcher" className="relative">
                <div className="justify-center items-center flex flex-col px-4 sm:gap-10 gap-6">
                    <h1 className="sm:text-5xl text-4xl font-light max-w-3xl text-center pt-36">
                        The Perfect <span className="font-medium">Launcher</span>
                    </h1>
                    <p className="sm:text-lg text-base font-light max-w-3xl text-center">
                        With no ads or unnecessary bloat, OneClient's launcher provides the smoothest experience for managing your Minecraft mods. Install all your mods in one click and immediately get into the game.
                    </p>
                    <MediaCarousel
                        className="mt-8"
                        aspect="3:2"
                        spacing={76}
                        images={[
                            { light: '/launcher1.png', dark: '/launcher1.png' },
                            { light: '/launcher2.png', dark: '/launcher2.png' },
                            { light: '/launcher3.png', dark: '/launcher3.png' },
                            { light: '/launcher4.png', dark: '/launcher4.png' },
                        ]}
                    />
                    <div className="flex lg:flex-row flex-col lg:gap-12 gap-4 mt-8 max-w-6xl w-full">
                        <InfoCard
                            icon={<ClickIcon className="h-6 w-6" />}
                            delay={0.1}
                            label="One Click Install"
                            description="Unlike using Fabric normally, OneClient installs all the mods you need in one click. No need to search Curseforge & Modrinth all the time, we've got you covered."
                        />
                        <InfoCard
                            icon={<UIIcon className="h-6 w-6" />}
                            delay={0.2}
                            label="Native App"
                            description="The launcher is a native desktop app unlike the competition where their launchers are web-based. This brings forth major performance improvements."
                        />
                        <InfoCard
                            icon={<SmileIcon className="h-6 w-6" />}
                            delay={0.3}
                            label="Bloat-Free"
                            description="The launcher will never have ads or unnecessary bloat. The goal will always to bring the best experience to our users with the features people want."
                        />
                    </div>
                </div>
            </section>
            <section id="cosmetics" className="relative">
                <div className="justify-center items-center flex flex-col px-4 sm:gap-10 gap-6">
                    <h1 className="sm:text-5xl text-4xl font-light max-w-3xl text-center pt-36">
                        Flashy <span className="font-medium">Cosmetics</span>
                    </h1>
                    <p className="sm:text-lg text-base font-light max-w-3xl text-center">
                        Show your drip 🔥 with our sick cosmetics. We work with 3D designers and Minecraft cosmetic creators to deliver the coolest stuff. Your cosmetics will be visible to all other OneClient users, and it's a great way to support
                        us!
                    </p>
                    <LinkButton
                        icon={<BagIcon className="sm:w-6 sm:h-6 w-5 h-5 text-white" />}
                        label="Check Out the Store!"
                        color="blue"
                        className="sm:py-1.5 py-1 px-2 sm:w-fit w-full"
                        labelClassName="sm:text-lg! text-base!"
                        href="https://store.polyfrost.org"
                    />
                    <img src="/cosmeticman.png" alt="Cosmetics man" className="max-w-240 w-full" />
                    <div className="flex lg:flex-row flex-col lg:gap-12 gap-4 mt-8 max-w-6xl w-full">
                        <InfoCard
                            icon={<StarIcon className="h-6 w-6" />}
                            delay={0.1}
                            label="Great Designs"
                            description="We work with talented 3D designers to bring you the most visually appealing cosmetics. We aim to compete with the competition and provide the best designs."
                        />
                        <InfoCard
                            icon={<ColorIcon className="h-6 w-6" />}
                            delay={0.2}
                            label="Thematic Collections"
                            description="Our cosmetics are organized into thematic collections, making it easy to find items that match your style. Create a special look for any time of the year!"
                        />
                        <InfoCard
                            icon={<DollarIcon className="h-6 w-6" />}
                            delay={0.3}
                            label="Competitive Pricing"
                            description="Cosmetics are priced competitively so you get the best value for your money. Competitor prices are always considered when setting the prices of our items."
                        />
                    </div>
                </div>
            </section>
            <section className="relative z-10">
                <div className="px-4">
                    <div className="bg-primary/50 light:bg-primary-light/50 relative flex my-30 max-w-6xl w-full mx-auto rounded-xl border border-white/10 light:border-white/15 backdrop-blur-[32px] shadow-[0px_6px_15px_0px_rgba(0,0,0,0.15)] light:shadow-[0px_6px_15px_0px_rgba(0,0,0,0.10)]">
                        <div className="flex flex-col sm:p-6 p-4 sm:gap-6 gap-4 z-20">
                            <div className="flex flex-row items-center gap-6">
                                <LightningIcon className="h-10 w-10" />
                                <h1 className="sm:text-4xl text-3xl font-light">
                                    Dont Trust Us? <span className="font-normal">Read The Code...</span>
                                </h1>
                            </div>
                            <p className="sm:text-xl text-base font-light text-white/75 light:text-black/75 max-w-2xl w-full">
                                OneClient is fully open source. Every optimization, every line of the launcher, out in the open. Our competitors can't say that.
                            </p>
                            <div className="flex sm:flex-row flex-col sm:gap-4 gap-2 items-center sm:w-fit w-full">
                                <DownloadDropdown {...Route.useLoaderData().downloads} className="sm:py-1.5 py-1 px-2 sm:w-fit w-full" labelClassName="sm:text-lg! text-base!" color="blue" />
                                <LinkButton
                                    icon={<GitHubIcon className="sm:w-6 sm:h-6 w-5 h-5" />}
                                    label="View on GitHub"
                                    color="primary"
                                    className="sm:py-1.5 py-1 px-2 sm:w-fit w-full"
                                    labelClassName="sm:text-lg! text-base!"
                                    href="https://github.com/Polyfrost"
                                    delay={0.4}
                                />
                            </div>
                        </div>
                        <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                            <div className="absolute top-0 right-0 flex">
                                <div className="absolute bg-linear-to-r from-[#1a2937] light:from-[#ccdaf8] to-transparent w-120 h-120 z-10" />
                                <img className="max-w-120 sm:brightness-100 brightness-50" src="/code.png" alt="Code screenshot" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
