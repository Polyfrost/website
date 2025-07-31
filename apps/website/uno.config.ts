import {
	defineConfig,
	presetIcons,
	presetTypography,
	presetUno,
	transformerDirectives,
	transformerVariantGroup,
} from "unocss";

export default defineConfig({
	rules: [
		["parallax-container", { perspective: "10px" }],
		[
			/^parallax-(\d+)$/,
			([, d]) => ({
				transform: `translateZ(-${d}px) scale(${parseInt(d) / 10 + 1})`,
			}),
		],
	],
	shortcuts: {},
	presets: [
		presetUno(),
		presetIcons(),
		presetTypography({
			cssExtend: {
				blockquote: {
					"border-left": "4px solid rgba(138, 150, 168)",
					"border-radius": "12px",
				},
				img: {
					"border-radius": "12px",
				},
				"p:first-child": {
					"margin-top": "0",
				},
				"h1, h2, h3": {
					color: "rgba(32, 55, 91)",
				},
				":global(.dark) h1, h2, h3": {
					color: "rgba(213, 219, 255)",
				},
			},
		}),
	],
	transformers: [transformerVariantGroup(), transformerDirectives()],
	theme: {
		colors: {
			blue: {
				20: "rgba(223, 236, 253)",
				30: "rgba(183, 208, 251)",
				50: "rgba(231, 235, 252)",
				60: "rgba(0, 72, 197)",
				75: "rgba(227, 236, 245)",
				100: "rgba(210, 225, 249)",
				200: "rgba(189, 215, 249)",
				300: "rgba(166, 200, 249)",
				400: "rgba(56, 132, 255)",
				450: "rgba(37,99,235)",
				500: "rgba(31, 101, 214)",
				600: "rgba(9, 84, 165)",
				800: "rgba(19, 43, 83)",
			},
			green: {
				300: "rgba(35, 154, 96, 0.5)",
			},
			gray: {
				50: "rgba(240, 242, 244)",
				100: "rgba(196, 202, 212)",
				200: "rgba(196, 202, 212)",
				400: "rgba(138, 150, 168)",
				600: "rgba(42, 44, 48)",
				700: "rgba(65, 74, 88)",
				800: "rgba(42, 47, 55)",
			},
			white: {
				DEFAULT: "rgba(255, 255, 255)",
				"1/4": "rgba(255, 255, 255, 0.25)",
				light: "rgba(235, 245, 254)",
			},
			black: {
				DEFAULT: "rgba(0, 0, 0)",
			},
			text: {
				DEFAULT: "rgba(2, 3, 7)",
				primary: "rgba(2, 3, 7)",
			},
			// Other
			"navy-peony": "rgba(32, 55, 91)",
			lightslategray: "rgba(119, 143, 183)",
			primary: {
				100: "rgba(23, 28, 33)",
				200: "rgba(50, 74, 245)",
				600: "rgba(20, 82, 204)",
			},
			dark: {
				background: "rgba(17, 23, 28)",
				primary: "rgba(213, 219, 255)",
				secondary: "rgba(120, 129, 141)",
			},
		},
		borderRadius: {
			none: "0",
			sm: "3px",
			md: "5px",
			lg: "8px",
			xl: "12px",
			"2xl": "16px",
			"3xl": "20px",
			"4xl": "24px",
			full: "100vw",
		},
		fontSize: {
			// rem starts at 16px on desktop, 14px on tailwind 'sm' and below
			xxs: ["0.625rem", "1rem"], // 10px
			xs: ["0.75rem", "1rem"], // 12px
			sm: ["0.875rem", "inherit"], // 14px
			md: ["1rem", "inherit"], // 16px
			lg: ["1.125rem", "inherit"], // 18px
			xl: ["1.25rem", "inherit"], // 20px

			"header-sm": ["1.5rem", "inherit"], // 24px
			header: ["1.75rem", "inherit"], // 28px
			"header-lg": ["2rem", "inherit"], // 32px
			"header-page": ["2.25rem", "inherit"], // 36px

			"body-sm": ["0.938rem", "inherit"], // 15px
			body: ["1rem", "inherit"], // 16px
			"body-lg": ["1.063rem", "inherit"], // 17px
		},
		fontFamily: {
			mono: ['"Roboto Mono"', "monospace"],
		},
		extend: {
			// zIndex: {
			// 	'navbar': '9999', // Nothing should be above the navbar or backdrop
			// 	'navbar-backdrop': '9998',
			// },
			// maxHeight: {
			// 	'3/4-screen': '75vh',
			// 	'4/5-screen': '80vh',
			// },
			// lineHeight: {
			// 	none: '0',
			// },
			// transitionProperty: {
			// 	filter: 'filter',
			// },
		},
	},
});
