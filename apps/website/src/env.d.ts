/// <reference path="../.astro/types.d.ts" />
/// <reference path="../.astro/icon.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly GITHUB_PAT: string?;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
