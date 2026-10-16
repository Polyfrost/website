import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ redirect }) => redirect('https://discord.gg/');
