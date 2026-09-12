function findCircleNum(isConnected: number[][]): number {
    const n = isConnected.length;
    const toVisitSet = new Set<number>(Array.from({ length: n }, (_, i) => i));
    let provinceCount = 0;

    const dfs = (index: number) => {
        if (toVisitSet.has(index)) {
            toVisitSet.delete(index);
            isConnected[index].forEach((connected, nextIndex) => {
                connected && dfs(nextIndex);
            });
        }
    };

    const iter = toVisitSet.values();
    let iteratorResult = iter.next();
    while (!iteratorResult.done) {
        provinceCount++;
        dfs(iteratorResult.value);
        iteratorResult = iter.next();
    }

    return provinceCount;
};
