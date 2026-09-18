function minReorder(n: number, connections: number[][]): number {
    const citySet = new Set<number>(Array.from({ length: n }, (_, i) => i));
    const cityRoadMapFT = Array.from({ length: n }, (): number[] => []);
    const cityRoadMapTF = Array.from({ length: n }, (): number[] => []);
    connections.forEach(([from, to]) => {
        cityRoadMapFT[from].push(to);
        cityRoadMapTF[to].push(from);
    });

    let res = 0;
    const dfs = (index: number) => {
        if (citySet.has(index)) {
            citySet.delete(index);
            cityRoadMapFT[index].forEach(toCity => {
                // reverse road and extend
                if (citySet.has(toCity)) {
                    res++;
                }
                dfs(toCity);
            });
            cityRoadMapTF[index].forEach(fromCity => {
                dfs(fromCity);
            });
        }
    };

    dfs(0);

    return res;
};
