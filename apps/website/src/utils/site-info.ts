import type { Icon } from "virtual:astro-icon";

export interface ProjectDownload {
	url: string;
	platform?: "windows" | "mac" | "linux" | "universal";
	architecture?: "x86" | "x64" | "arm" | "arm64" | "universal";
}

export interface Project {
	name: string;
	description: string;
	logo?: Icon;
	tag?: string;
	downloads?: ProjectDownload[];
	descriptionLong?: string;
	hasPage?: boolean;
}

export interface NavbarDropdown {
	name: string;
	description: string;
	path?: string;
	logo?: Icon;
	tag?: string;
}

export interface NavbarElement {
	text?: string;
	logo?: [Icon, number, number];
	path?: string;
	alt?: string;
	dropdown?: NavbarDropdown[];
}

export interface FooterColumn {
	header: string;
	links: {
		text: string;
		url: string;
	}[];
}

export interface Config {
	name: string;
	title: string;
	description: string;
	image: {
		src: string;
		alt: string;
	};
	projects: Project[];
	socials: {
		youtube: string;
		// twitter: string,
		discord: string;
		github: string;
		modrinth: {
			type: "user" | "organization";
			id: string;
		};
		skyclient: string;
	};
	navbar: {
		left: NavbarElement[];
		right: NavbarElement[];
	};
	footer: FooterColumn[];
}

export const configConst = {
	name: "Polyfrost",
	title: "Polyfrost",
	description: "Building beautiful mods and tools, byte by byte",
	image: {
		src: "/media/polyfrost/minimal.svg",
		alt: "Polyfrost Logo",
	},
	projects: getProjects(),
	socials: {
		youtube: "https://youtube.com/@Polyfrost",
		discord: "https://discord.gg/N4qW7TW3dv",
		github: "https://github.com/Polyfrost",
		modrinth: {
			id: "polyfrost",
			type: "organization",
		},
		skyclient: "https://skyclient.co",
	},
	navbar: {
		left: [
			{
				logo: ["polyfrost.full", 174, 30],
				path: "/",
			},
		],
		right: [
			{
				text: "Home",
				path: "/",
			},
			{
				text: "Mods",
				path: "/mods",
			},
			{
				text: "Projects",
				dropdown: getProjects().map((project) => {
					if (project.hasPage)
						(project as any).path =
							`/projects/${project.name.toLowerCase()}`;

					return project;
				}) as unknown as NavbarDropdown[],
			},
			{
				text: "About Us",
				path: "/about",
			},
			{
				text: "Blog",
				path: "/blog",
			},
		],
	},
	footer: [
		{
			header: "Products",
			links: getProjects()
				.filter((project) => project.hasPage === true)
				.map((project) => ({
					text: project.name,
					url: `/projects/${project.name.toLowerCase()}`,
				}))
				.concat([
					{
						text: "Mods",
						url: "/mods",
					},
				]),
		},
		{
			header: "Organization",
			links: [
				{
					text: "About us",
					url: "/about",
				},
				{
					text: "Blog",
					url: "/blog",
				},
				{
					text: "Branding",
					url: "/branding",
				},
				{
					text: "Contact us",
					url: "/contact",
				},
				{
					text: "Documentation",
					url: "https://docs.polyfrost.org",
				},
				{
					text: "Open source",
					url: "/oss",
				},
			],
		},
		{
			header: "Legal",
			links: [
				{
					text: "Terms of service",
					url: "/legal/terms",
				},
				{
					text: "Privacy policy",
					url: "/legal/privacy",
				},
			],
		},
	],
} satisfies Config;

function getProjects(): Project[] {
	return [
		{
			name: "OneConfig",
			description:
				"The next-generation config library for Forge and Fabric",
			logo: "oneconfig.minimal",
			hasPage: true,
		},
		{
			name: "OneClient",
			description:
				"The anti-client.",
			logo: "oneclient.minimal",
			hasPage: true,
		},
		{
			name: "OneLauncher",
			description:
				"The next-generation launcher for all your Minecraft needs",
			logo: "onelauncher.minimal",
			tag: "SOON",
		},
	];
}

export default configConst;
