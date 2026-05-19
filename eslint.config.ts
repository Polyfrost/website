import petal from '@flowr/eslint';

export default petal({
	astro: {
		accessibility: true,
	},
	typescript: true,
	unocss: true,
	ignores: [
		'packages/client/src/core.ts',
		'apps/desktop/src/commands.ts',
	],
	rules: {
		'astro/no-unused-css-selector': 'off',
	},
});
