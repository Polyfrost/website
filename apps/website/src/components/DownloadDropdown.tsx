import { createServerFn } from '@tanstack/react-start';
import { getRequestHeader } from '@tanstack/react-start/server';
import { motion } from 'framer-motion';
import DownloadIcon from './icons/Download';
import DownChevronIcon from './icons/DownChevron';

type OS = 'windows' | 'macos' | 'linux';
type Arch = 'x64' | 'x86' | 'arm64' | 'universal';
type Format = 'exe' | 'msi' | 'dmg' | 'appimage' | 'deb' | 'rpm' | 'aur';

export interface Download {
    os: OS;
    arch: Arch;
    format: Format;
    title: string;
    fileName: string;
    url: string;
}

interface Release {
    version: string;
    url: string;
    publishedAt: string;
    downloads: Download[];
}

interface RawRelease {
    tag_name: string;
    html_url: string;
    published_at: string;
    prerelease: boolean;
    draft: boolean;
    assets: { name: string; browser_download_url: string }[];
}

const repo = 'Polyfrost/OneLauncher';

export const latestReleaseUrl = `https://github.com/${repo}/releases/latest`;

const formats: Record<Format, OS> = {
    exe: 'windows',
    msi: 'windows',
    dmg: 'macos',
    appimage: 'linux',
    deb: 'linux',
    rpm: 'linux',
    aur: 'linux',
};

const archs: [Arch, RegExp][] = [
    ['arm64', /aarch64|arm64/],
    ['x64', /x86[_-]?64|amd64|x64/],
    ['x86', /i[36]86|ia32|x86/],
];

const osLabels: Record<OS, string> = {
    windows: 'Windows',
    macos: 'macOS',
    linux: 'Linux',
};

const archLabels: Record<Arch, string> = {
    x64: 'x64',
    x86: 'x86',
    arm64: 'ARM64',
    universal: 'Universal',
};

const macArchLabels: Partial<Record<Arch, string>> = {
    arm64: 'Apple Silicon',
    x64: 'Intel',
};

const buttonArchLabels: Partial<Record<Arch, string>> = {
    arm64: 'ARM64',
    x64: 'x64',
    x86: 'x86',
};

const macButtonArchLabels: Partial<Record<Arch, string>> = {
    arm64: 'M1+',
    x64: 'Intel',
};

function buttonLabel(download: Download | undefined, downloads: Download[]): string {
    if (!download) return 'Download OneLauncher';

    const label = `Download for ${osLabels[download.os]}`;

    const archCount = new Set(downloads.filter((d) => d.os === download.os && d.format !== 'aur').map((d) => d.arch)).size;
    if (archCount < 2) return label;

    const arch = download.os === 'macos' ? macButtonArchLabels[download.arch] : buttonArchLabels[download.arch];

    return arch ? `${label} (${arch})` : label;
}

const formatLabels: Record<Format, string> = {
    exe: '.exe',
    msi: '.msi',
    dmg: '.dmg',
    appimage: 'AppImage',
    deb: '.deb',
    rpm: '.rpm',
    aur: 'AUR',
};

const aurPackages: Download[] = [
    {
        os: 'linux',
        arch: 'universal',
        format: 'aur',
        title: 'AUR (oneclient-bin)',
        fileName: 'oneclient-bin',
        url: 'https://aur.archlinux.org/packages/oneclient-bin',
    },
    {
        os: 'linux',
        arch: 'universal',
        format: 'aur',
        title: 'AUR (oneclient)',
        fileName: 'oneclient',
        url: 'https://aur.archlinux.org/packages/oneclient',
    },
];

const formatOrder = Object.keys(formats) as Format[];
const osOrder: OS[] = ['windows', 'macos', 'linux'];
const archOrder: Arch[] = ['x64', 'arm64', 'x86', 'universal'];

const osPatterns: [OS, RegExp][] = [
    ['windows', /windows|win32|win64/],
    ['macos', /mac ?os|macintosh/],
    ['linux', /linux|x11|cros/],
];

const archPatterns: [Arch, RegExp][] = [
    ['arm64', /aarch64|arm64/],
    ['x64', /x86[_-]?64|amd64|win64|wow64|x64/],
    ['x86', /i[36]86|win32|wow32/],
];

const defaultArch: Record<OS, Arch> = {
    windows: 'x64',
    macos: 'arm64',
    linux: 'x64',
};

const cacheTtl = 10 * 60 * 1000;
const retryTtl = 60 * 1000;

const fallbackRelease: Release = {
    version: '',
    url: latestReleaseUrl,
    publishedAt: '',
    downloads: aurPackages,
};

let cached: Release | undefined;
let fetchedAt = 0;
let failedAt = 0;
let inFlight: Promise<Release> | undefined;

function listDownloads(assets: RawRelease['assets']): Download[] {
    const signed = new Set(assets.filter((a) => a.name.endsWith('.sig')).map((a) => a.name.slice(0, -4)));
    const found = new Map<string, Download>();

    for (const asset of assets) {
        const name = asset.name.toLowerCase();
        const format = formatOrder.find((f) => name.endsWith(`.${f}`));
        if (!format) continue;

        const os = formats[format];
        const arch = archs.find(([, pattern]) => pattern.test(name))?.[0] ?? 'universal';
        const key = `${os}:${arch}:${format}`;

        if (found.has(key) && signed.has(asset.name)) continue;

        found.set(key, {
            os,
            arch,
            format,
            title: '',
            fileName: asset.name,
            url: asset.browser_download_url,
        });
    }

    const parsed = [...found.values()].sort((a, b) => osOrder.indexOf(a.os) - osOrder.indexOf(b.os) || archOrder.indexOf(a.arch) - archOrder.indexOf(b.arch) || formatOrder.indexOf(a.format) - formatOrder.indexOf(b.format));

    const title = (download: Download) => {
        const sameOS = parsed.filter((d) => d.os === download.os);
        const archCount = new Set(sameOS.map((d) => d.arch)).size;
        const formatCount = new Set(sameOS.map((d) => d.format)).size;
        const parts = [osLabels[download.os]];

        if (archCount > 1 || formatCount === 1) parts.push(download.os === 'macos' ? (macArchLabels[download.arch] ?? archLabels[download.arch]) : archLabels[download.arch]);

        if (formatCount > 1) parts.push(formatLabels[download.format]);

        return parts.join(' ');
    };

    return [...parsed.map((download) => ({ ...download, title: title(download) })), ...aurPackages];
}

async function fetchRelease(): Promise<Release> {
    const response = await fetch(`https://api.github.com/repos/${repo}/releases?per_page=10`, {
        headers: {
            'accept': 'application/vnd.github+json',
            'user-agent': 'polyfrost-website',
            ...(process.env.GITHUB_TOKEN ? { authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
        },
    });

    if (!response.ok) throw new Error(`GitHub responded ${response.status}`);

    const releases: RawRelease[] = await response.json();
    const latest = releases.find((release) => !release.draft && !release.prerelease);
    if (!latest) throw new Error('No published release found');

    return {
        version: latest.tag_name.replace(/^oneclient-|^v/, ''),
        url: latest.html_url,
        publishedAt: latest.published_at,
        downloads: listDownloads(latest.assets),
    };
}

function loadRelease(): Promise<Release> {
    const now = Date.now();

    if (cached && now - fetchedAt < cacheTtl) return Promise.resolve(cached);
    if (now - failedAt < retryTtl) return Promise.resolve(cached ?? fallbackRelease);

    inFlight ??= fetchRelease()
        .then((release) => {
            cached = release;
            fetchedAt = Date.now();
            failedAt = 0;
            return release;
        })
        .catch((error) => {
            failedAt = Date.now();
            console.error('Failed to load the latest OneLauncher release:', error);
            return cached ?? fallbackRelease;
        })
        .finally(() => {
            inFlight = undefined;
        });

    return inFlight;
}

function detectPlatform() {
    const agent = getRequestHeader('user-agent')?.toLowerCase();
    if (!agent || agent.includes('android')) return undefined;

    const os = osPatterns.find(([, pattern]) => pattern.test(agent))?.[0];
    if (!os) return undefined;

    const arch = os === 'macos' ? undefined : archPatterns.find(([, pattern]) => pattern.test(agent))?.[0];

    return { os, arch };
}

function pickDownload(release: Release) {
    const platform = detectPlatform();
    if (!platform) return undefined;

    const sameOS = release.downloads.filter((download) => download.os === platform.os && download.format !== 'aur');
    const arch = platform.arch ?? defaultArch[platform.os];

    return sameOS.find((download) => download.arch === arch) ?? sameOS.find((download) => download.arch === 'universal') ?? (platform.arch ? undefined : sameOS[0]);
}

export const getDownloads = createServerFn({ method: 'GET' }).handler(async () => {
    const release = await loadRelease();
    return { ...release, featured: pickDownload(release) };
});

export default function DownloadDropdown({
    downloads,
    featured,
    color,
    className,
    labelClassName,
    addedWidth,
    delay,
}: {
    downloads: Download[];
    featured?: Download;
    color: 'primary' | 'blue' | 'red';
    className: string;
    labelClassName?: string;
    addedWidth?: string;
    delay?: number;
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

    return (
        <>
            {delay ? (
                <motion.div
                    initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)', transition: { delay: delay, duration: 0.5, ease: [0.39, 0.21, 0.12, 0.96] } }}
                    className={`group relative z-50 flex w-full`}
                >
                    <a
                        href={featured?.url ?? latestReleaseUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={`${buttonColor()} ${className ?? ''} disabled:opacity-50 disabled:cursor-not-allowed border relative rounded-lg shadow-[0px_6px_15px_0px_rgba(0,0,0,0.15)] light:shadow-[0px_6px_15px_0px_rgba(0,0,0,0.10)] select-none`}
                        style={{ paddingRight: addedWidth, paddingLeft: addedWidth }}
                    >
                        <div className="flex flex-row items-center justify-center gap-2 px-3 py-1">
                            <DownloadIcon className="sm:w-6 sm:h-6 w-5 h-5 text-white" />
                            <p className={`${color === 'primary' ? 'text-white light:text-black' : 'text-white'} text-sm leading-6 whitespace-nowrap ${labelClassName ?? ''}`}>{buttonLabel(featured, downloads)}</p>
                            <DownChevronIcon className="sm:w-6 sm:h-6 w-5 h-5 text-white" />
                        </div>
                    </a>
                    <div className="absolute top-full left-0 w-full pt-2 group-hover:block hidden">
                        <div className="flex flex-col bg-primary light:bg-primary-light rounded-xl border border-white/10 light:border-white/15 overflow-hidden">
                            {downloads.map((download, index) => (
                                <a key={index} href={download.url} target="_blank" rel="noreferrer" className="text-center py-1.5 px-2 hover:brightness-110 bg-primary/50 light:bg-primary-light/50 duration-300">
                                    {download.title}
                                </a>
                            ))}
                        </div>
                    </div>
                </motion.div>
            ) : (
                <div className={`group relative z-50 flex w-full`}>
                    <a
                        href={featured?.url ?? latestReleaseUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={`${buttonColor()} ${className ?? ''} disabled:opacity-50 disabled:cursor-not-allowed border relative rounded-lg shadow-[0px_6px_15px_0px_rgba(0,0,0,0.15)] light:shadow-[0px_6px_15px_0px_rgba(0,0,0,0.10)] select-none`}
                        style={{ paddingRight: addedWidth, paddingLeft: addedWidth }}
                    >
                        <div className="flex flex-row items-center justify-center gap-2 px-3 py-1">
                            <DownloadIcon className="sm:w-6 sm:h-6 w-5 h-5 text-white" />
                            <p className={`${color === 'primary' ? 'text-white light:text-black' : 'text-white'} text-sm leading-6 whitespace-nowrap ${labelClassName ?? ''}`}>{buttonLabel(featured, downloads)}</p>
                            <DownChevronIcon className="sm:w-6 sm:h-6 w-5 h-5 text-white" />
                        </div>
                    </a>
                    <div className="absolute top-full left-0 w-full pt-2 group-hover:block hidden">
                        <div className="flex flex-col bg-primary light:bg-primary-light rounded-xl border border-white/10 light:border-white/15 overflow-hidden">
                            {downloads.map((download, index) => (
                                <a key={index} href={download.url} target="_blank" rel="noreferrer" className="text-center py-1.5 px-2 hover:brightness-110 bg-primary/50 light:bg-primary-light/50 duration-300">
                                    {download.title}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
