import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import rehypeSanitize from 'rehype-sanitize';

const TOS_URL = 'https://data-v2.polyfrost.org/oneclient/tos.json';
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

export type LegalKind = 'terms' | 'privacy';

export interface LegalDocument {
	/** Rendered markdown, or `null` when the endpoint has no content for this document yet. */
	html: string | null;
	version: number;
}

interface TosResponse {
	version: number;
	privacy_version: number;
	terms: string;
	privacy: string;
}

interface LegalCache {
	terms: LegalDocument;
	privacy: LegalDocument;
	timestamp: number;
}

const EMPTY: LegalCache = {
	terms: { html: null, version: 0 },
	privacy: { html: null, version: 0 },
	timestamp: 0,
};

let cache: LegalCache | null = null;
let inflight: Promise<LegalCache> | null = null;

// This markdown is fetched at runtime and injected with `set:html`, so it is sanitized
// rather than trusted: raw HTML in markdown would otherwise reach the page verbatim.
const processor = createMarkdownProcessor({
	gfm: true,
	smartypants: true,
	rehypePlugins: [rehypeSanitize],
});

// The endpoint serves the literal string `BLANK` for a document that isn't written yet.
function hasContent(markdown: string): boolean {
	const trimmed = markdown.trim();
	return trimmed.length > 0 && trimmed !== 'BLANK';
}

async function renderDocument(markdown: string, version: number): Promise<LegalDocument> {
	if (!hasContent(markdown))
		return { html: null, version };

	const { code } = await (await processor).render(markdown);
	return { html: code, version };
}

async function fetchLegal(): Promise<LegalCache> {
	const res = await fetch(TOS_URL);
	if (!res.ok)
		throw new Error(`Fetch failed: ${res.status} ${res.statusText} for ${TOS_URL}`);

	const data: TosResponse = await res.json();

	const [terms, privacy] = await Promise.all([
		renderDocument(data.terms, data.version),
		renderDocument(data.privacy, data.privacy_version),
	]);

	return { terms, privacy, timestamp: Date.now() };
}

async function getLegal(): Promise<LegalCache> {
	if (cache && (Date.now() - cache.timestamp) < CACHE_TTL_MS)
		return cache;

	// Collapse concurrent misses into a single fetch and render.
	inflight ??= fetchLegal()
		.then((fresh) => {
			cache = fresh;
			return fresh;
		})
		.finally(() => {
			inflight = null;
		});

	try {
		return await inflight;
	}
	catch (err) {
		const message = err instanceof Error ? err.message : 'Unknown error';
		console.error('[legal]', message);

		// Serving the last good copy beats serving an empty legal page.
		return cache ?? EMPTY;
	}
}

export async function getLegalDocument(kind: LegalKind): Promise<LegalDocument> {
	const legal = await getLegal();
	return legal[kind];
}
