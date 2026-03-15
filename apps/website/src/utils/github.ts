import { Octokit } from '@octokit/core';
import { throttling } from '@octokit/plugin-throttling';

export const ONE_LAUNCHER_REPOSITORY = {
	owner: 'Polyfrost',
	repo: 'OneLauncher',
} as const;

const GitHubClient = Octokit.plugin(throttling).defaults({
	request: {
		headers: {
			'Accept': 'application/vnd.github+json',
			'X-GitHub-Api-Version': '2022-11-28',
		},
	},
	throttle: {
		onRateLimit: (retryAfter, options, octokit, retryCount) => {
			octokit.log.warn(
				`GitHub rate limit hit for ${options.method} ${options.url}`,
			);

			if (retryCount >= 1) {
				octokit.log.warn(
					`Not retrying GitHub request more than ${retryCount} time(s)`,
				);
				return;
			}
			if (retryAfter >= 10) {
				octokit.log.warn(
					`Not waiting ${retryAfter} second(s) to retry GitHub request`,
				);
				return;
			}
			return true;
		},
		onSecondaryRateLimit: (retryAfter, options, octokit, retryCount) => {
			octokit.log.warn(
				`GitHub secondary rate limit hit for ${options.method} ${options.url}`,
			);

			if (retryCount >= 1) {
				octokit.log.warn(
					`Not retrying GitHub request more than ${retryCount} time(s)`,
				);
				return;
			}
			if (retryAfter >= 10) {
				octokit.log.warn(
					`Not waiting ${retryAfter} second(s) to retry GitHub request`,
				);
				return;
			}
			return true;
		},
	},
	userAgent: 'Polyfrost/1.0.0',
	...(import.meta.env.GITHUB_PAT ? { auth: import.meta.env.GITHUB_PAT } : {}),
});

export const github = new GitHubClient();
