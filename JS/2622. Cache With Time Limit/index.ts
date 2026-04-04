class TimeLimitedCache {
    cacheMap = new Map<number, {
        value: number,
        expirationTime: number
    }>();

    set(key: number, value: number, duration: number): boolean {
        const current = Date.now();
        const result = this.get(key, current) >= 0;

        this.cacheMap.set(key, {
            value,
            expirationTime: current + duration
        });

        return result;
    }

    get(key: number, current: number = Date.now()): number {
        const target = this.cacheMap.get(key);
        if (target) {
            if (target.expirationTime >= current) {
                return target.value;
            }
            else {
                this.cacheMap.delete(key);
                return -1;
            }
        }
        return -1;
    }

    count(): number {
        const current = Date.now();
        let i = 0;
        for (const item of this.cacheMap) {
            if (item[1].expirationTime >= current) {
                ++i;
            }
        }
        return i;
    }
}

/**
 * const timeLimitedCache = new TimeLimitedCache()
 * timeLimitedCache.set(1, 42, 1000); // false
 * timeLimitedCache.get(1) // 42
 * timeLimitedCache.count() // 1
 */
