import type { APIRoute } from 'astro';
import configConst from '@utils/site-info';

export const GET: APIRoute = async ({ redirect }) => redirect(configConst.socials.discord);
