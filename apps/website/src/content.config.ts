import { z } from 'astro/zod';
import { defineCollection } from 'astro:content';

const blog = defineCollection({
	schema: z.object({
		title: z.string().describe('The title of this blogpost.'),
		homepageMetadata: z.object({
			title: z.string().max(16).describe('Short callout (e.g. `New!` or `OneConfig v2`).'),
			subtitle: z.string().max(50).optional().describe('Short tagline attracting attention to the post'),
		}).optional().describe('Configure the homepage banner link for this post if it\'s the most recent post'),
		description: z.string().describe('Summary of the blogpost. Appears in metadata and the index.'),
		publishDate: z.coerce.date().describe('A date string or YAML publish date that is compatible with JavaScript.'),
		updatedDate: z.coerce.date().optional().describe('A date string or YAML update date that is compatible with JavaScript.'),
		socialImage: z.string().optional().describe('The path to the open graph image of this blogpost for social media previews. (preoptimized webp)'),
		coverImage: z.string().optional().describe('The path to the cover image displayed at the top of the blogpost and index. (preoptimized webp)'),
		lang: z.enum(['en']).default('en').describe('The language of this blogpost.'),
	}),
});

export const collections = { blog };
