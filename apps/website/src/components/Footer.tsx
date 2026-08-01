import Logo from './Logo';
import PolyLogo from './PolyLogo';

export default function Footer() {
    return (
        <footer className={`bottom-0 w-full bg-primary/45 light:bg-primary-light/45 border-t border-t-white/10 light:border-t-white/15 py-6 backdrop-blur-lg`}>
            <div className="flex max-w-273 mx-auto w-full flex-col min-[1130px]:px-0 px-4">
                <div className="flex min-[800px]:flex-row flex-col items-start justify-between gap-4 min-[800px]:pb-20 pb-6">
                    <div className="flex flex-col gap-1">
                        <Logo className="h-8 w-auto" />
                        <div className="flex flex-row items-center gap-2 pl-1">
                            <p className="text-[#2567D8]/75 text-[13px]">by</p>
                            <PolyLogo className="h-5 w-auto" />
                        </div>
                    </div>
                    <div className="flex min-[800px]:flex-row flex-col items-start gap-x-14 gap-y-6">
                        <div className="flex flex-col gap-2">
                            <h1 className="font-medium pb-1">Polyfrost</h1>
                            <a className="text-white/75 light:text-black/75 text-sm hover:text-white/90 light:hover:text-black/90 duration-300" href="https://polyfrost.org" target="_blank" rel="noreferrer">
                                Main Website
                            </a>
                            <a className="text-white/75 light:text-black/75 text-sm hover:text-white/90 light:hover:text-black/90 duration-300" href="https://polyfrost.org/about" target="_blank" rel="noreferrer">
                                About Us
                            </a>
                            <a className="text-white/75 light:text-black/75 text-sm hover:text-white/90 light:hover:text-black/90 duration-300" href="https://polyfrost.org/branding" target="_blank" rel="noreferrer">
                                Branding
                            </a>
                            <a className="text-white/75 light:text-black/75 text-sm hover:text-white/90 light:hover:text-black/90 duration-300" href="https://docs.polyfrost.org" target="_blank" rel="noreferrer">
                                Documentation
                            </a>
                            <a className="text-white/75 light:text-black/75 text-sm hover:text-white/90 light:hover:text-black/90 duration-300" href="https://polyfrost.org/oss" target="_blank" rel="noreferrer">
                                Open Source
                            </a>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className="font-medium pb-1">Legal</h1>
                            <a className="text-white/75 light:text-black/75 text-sm hover:text-white/90 light:hover:text-black/90 duration-300" href="https://polyfrost.org/legal/terms" target="_blank" rel="noreferrer">
                                Terms of Service
                            </a>
                            <a className="text-white/75 light:text-black/75 text-sm hover:text-white/90 light:hover:text-black/90 duration-300" href="https://polyfrost.org/legal/privacy" target="_blank" rel="noreferrer">
                                Privacy Policy
                            </a>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h1 className="font-medium pb-1">Social</h1>
                            <a className="text-white/75 light:text-black/75 text-sm hover:text-white/90 light:hover:text-black/90 duration-300" href="https://polyfrost.org/discord" target="_blank" rel="noreferrer">
                                Discord
                            </a>
                            <a className="text-white/75 light:text-black/75 text-sm hover:text-white/90 light:hover:text-black/90 duration-300" href="https://youtube.com/@Polyfrost" target="_blank" rel="noreferrer">
                                Youtube
                            </a>
                            <a className="text-white/75 light:text-black/75 text-sm hover:text-white/90 light:hover:text-black/90 duration-300" href="https://github.com/Polyfrost" target="_blank" rel="noreferrer">
                                GitHub
                            </a>
                            <a className="text-white/75 light:text-black/75 text-sm hover:text-white/90 light:hover:text-black/90 duration-300" href="https://polyfrost.org/contact" target="_blank" rel="noreferrer">
                                Contact Us
                            </a>
                        </div>
                    </div>
                </div>
                <div className="flex min-[600px]:flex-row flex-col items-center justify-between gap-x-4">
                    <p className="text-white/75 light:text-black/75 text-sm leading-4.5">© 2026 Polyfrost. All rights reserved.</p>
                    <p className="text-white/75 light:text-black/75 text-sm leading-4.5">Not affiliated with Mojang or Microsoft</p>
                </div>
            </div>
        </footer>
    );
}
