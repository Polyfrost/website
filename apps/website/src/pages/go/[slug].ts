import type { APIRoute } from 'astro';
import { PLUS_BACKEND_URL } from '@utils/plus';

export const prerender = false;

export const GET: APIRoute = ({ params, redirect }) => {
	const slug = params.slug ?? '';
	return redirect(`${PLUS_BACKEND_URL}/go/${encodeURIComponent(slug)}`, 307);
};
