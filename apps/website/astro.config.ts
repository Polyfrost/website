import node from '@astrojs/node';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';
import { defineConfig, envField } from 'astro/config';

import icons from 'astro-icon';
import unocss from 'unocss/astro';

// https://astro.build/config
export default defineConfig({
	site: 'https://polyfrost.org',
	adapter: node({
		mode: "standalone"
	}),
	output: 'static',
	integrations: [
		unocss({
			injectReset: true,
		}),
		mdx(),
		sitemap(),
		partytown(),
		icons({
			svgoOptions: {
				plugins: [],
			},
		}),
	],
	vite: {
		ssr: { noExternal: ['smartypants'] },
	},
	experimental: {
		contentIntellisense: true
	},
	redirects: {
		"/discord": "https://discord.gg/N4qW7TW3dv",
		"/oneconfig": "/projects/oneconfig",
		"/oneclient-blog": "/blog/oneclient-announcement"
	}
});
