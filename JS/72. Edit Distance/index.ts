function minDistance(word1: string, word2: string): number {
    const m = word1.length;
    const n = word2.length;

    const memoryCache = Array.from({ length: m }, () => Array(n).fill(-1));

    const minDistanceSub = (l1: number, l2: number): number => {
        if (l1 >= m) {
            return n - l2;
        }
        else if (l2 >= n) {
            return m - l1;
        }
        else if (memoryCache[l1][l2] >= 0) {
            return memoryCache[l1][l2];
        }
        if (word1[l1] === word2[l2]) {
            memoryCache[l1][l2] = minDistanceSub(l1 + 1, l2 + 1);
        }
        else {
            memoryCache[l1][l2] = Math.min(
                // del
                minDistanceSub(l1 + 1, l2),
                // add
                minDistanceSub(l1, l2 + 1),
                // replace
                minDistanceSub(l1 + 1, l2 + 1)
            ) + 1;
        }
        return memoryCache[l1][l2];
    };

    return minDistanceSub(0, 0);
};
