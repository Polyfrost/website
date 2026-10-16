import type { APIRoute } from 'astro';
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

function sortPosts(a: { data: { publishDate: Date } }, b: { data: { publishDate: Date } }) {
	return Number(b.data.publishDate) - Number(a.data.publishDate);
}

function formatDate(date: Date) {
	date.setUTCHours(0);
	return date;
}

export const GET: APIRoute = async (context) => {
	const unsortedPosts = [...(await getCollection('blog'))];
	const posts = unsortedPosts.sort((a, b) => sortPosts(a, b));

	return rss({
		title: 'Polyfrost Blog',
		description: 'Recieve Polyfrost updates here',
		site: context.site!.href,
		items: posts.map(post => ({
			...post.data,
			title: post.data.title,
			description: post.data.description,
			pubDate: formatDate(post.data.publishDate),
			link: `/blog/${post.slug}/`,
		})),
	});
};
