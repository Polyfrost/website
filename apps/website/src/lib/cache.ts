/**
 * Wraps a loader in a process-local TTL cache that never rejects.
 *
 * Concurrent callers share a single in-flight request, so an expiring entry can't
 * stampede the upstream API. A failed load keeps the last known value (serving it
 * stale) and backs off for `retryTtl` instead of retrying on every request.
 */
export function createCache<T>(load: () => Promise<T>, { ttl = 10 * 60 * 1000, retryTtl = 30 * 1000 }: { ttl?: number; retryTtl?: number } = {}) {
    let value: T | undefined;
    let expiresAt = 0;
    let inflight: Promise<T | undefined> | undefined;

    return async (): Promise<T | undefined> => {
        if (Date.now() < expiresAt) return value;

        inflight ??= load()
            .then((next) => {
                value = next;
                expiresAt = Date.now() + ttl;
                return value;
            })
            .catch((error) => {
                console.error('[cache] load failed, serving stale value:', error);
                expiresAt = Date.now() + retryTtl;
                return value;
            })
            .finally(() => {
                inflight = undefined;
            });

        return inflight;
    };
}
