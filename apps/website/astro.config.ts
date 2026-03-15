import mdx from '@astrojs/mdx';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';
import configConst from '@utils/site-info';

import { defineConfig, envField } from 'astro/config';
import icons from 'astro-icon';
import unocss from 'unocss/astro';

// https://astro.build/config
export default defineConfig({
	site: 'https://polyfrost.org',
	adapter: node({
		mode: 'standalone',
	}),
	output: 'static',
	integrations: [
		unocss({
			injectReset: true,
		}),
		mdx(),
		sitemap(),
		icons({
			svgoOptions: {
				plugins: [],
			},
		}),
	],
	vite: {
		ssr: { noExternal: ['smartypants', 'ua-parser-js', '@octokit/core', '@octokit/plugin-throttling'] },
	},
	experimental: {
		contentIntellisense: true,
	},
	redirects: {
		'/discord': configConst.socials.discord,
		'/oneconfig': '/projects/oneconfig',
		'/oneclient-blog': '/blog/oneclient-announcement',
	},
	env: {
		schema: {
			GITHUB_PAT: envField.string({ context: 'server', access: 'secret', optional: true })
		}
	}
});
