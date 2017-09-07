interface memoryCache {
    put(key: string, value: number | string): void;
    get(key: string): number|string;
}
declare var cache: memoryCache;
declare module 'memory-cache' {
    export = cache;
}