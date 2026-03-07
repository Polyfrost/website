import type { APIRoute } from 'astro';

export const prerender = false;

interface DownloadStats {
	total: number;
	orgs: Record<string, number>;
	timestamp: number;
}

const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour
let cache: DownloadStats | null = null;

const ORGS = ['polyfrost', 'w-overflow', 'skyblockclient'];

function githubHeaders(): HeadersInit {
	const headers: Record<string, string> = {
		'Accept': 'application/vnd.github+json',
		'X-GitHub-Api-Version': '2022-11-28',
		'User-Agent': 'Polyfrost/1.0.0',
	};

	const pat = import.meta.env.GITHUB_PAT;
	if (pat)
		headers['Authorization'] = `Bearer ${pat}`;

	return headers;
}

async function fetchJson<T>(url: string, headers?: HeadersInit): Promise<T> {
	const res = await fetch(url, { headers });
	if (!res.ok)
		throw new Error(`Fetch failed: ${res.status} ${res.statusText} for ${url}`);
	return res.json();
}

interface GitHubRepo {
	name: string;
	homepage: string | null;
}

interface GitHubAsset {
	download_count: number;
}

interface GitHubRelease {
	assets: GitHubAsset[];
}

interface ModrinthProject {
	downloads: number;
}

async function countDownloads(): Promise<DownloadStats> {
	const headers = githubHeaders();
	let total = 0;
	const orgs: Record<string, number> = {};

	for (const org of ORGS) {
		let orgDownloads = 0;
		const repos = await fetchJson<GitHubRepo[]>(
			`https://api.github.com/orgs/${org}/repos?per_page=100`,
			headers,
		);

		const repoResults = await Promise.allSettled(repos.map(async (repo) => {
			let repoTotal = 0;

			const releases = await fetchJson<GitHubRelease[]>(
				`https://api.github.com/repos/${org}/${repo.name}/releases?per_page=100`,
				headers,
			);

			for (const release of releases) {
				for (const asset of release.assets)
					repoTotal += asset.download_count;
			}

			if (repo.homepage?.includes('modrinth')) {
				const slug = repo.homepage.replace(/\/+$/, '').split('/').pop();
				if (slug) {
					try {
						const project = await fetchJson<ModrinthProject>(
							`https://api.modrinth.com/v2/project/${slug}`,
						);
						repoTotal += project.downloads;
					}
					catch { /* modrinth project may not exist */ }
				}
			}

			return repoTotal;
		}));

		for (const result of repoResults) {
			if (result.status === 'fulfilled')
				orgDownloads += result.value;
		}

		orgs[org] = orgDownloads;
		total += orgDownloads;
	}

	return { total, orgs, timestamp: Date.now() };
}

export const GET: APIRoute = async () => {
	if (cache && (Date.now() - cache.timestamp) < CACHE_TTL_MS)
		return Response.json(cache);

	try {
		cache = await countDownloads();
		return Response.json(cache);
	}
	catch (err) {
		const message = err instanceof Error ? err.message : 'Unknown error';
		console.error('[/api/downloads]', message);

		if (cache)
			return Response.json(cache);

		return Response.json({ error: message }, { status: 502 });
	}
};
