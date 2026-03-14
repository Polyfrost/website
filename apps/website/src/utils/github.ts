export const FETCH_META = {
	headers: new Headers({
		'Accept': 'application/vnd.github+json',
		'X-GitHub-Api-Version': '2022-11-28',
	}),
};

if (import.meta.env.GITHUB_PAT)
	FETCH_META.headers.set('Authorization', `Bearer ${import.meta.env.GITHUB_PAT}`);
