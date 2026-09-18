
// By using a unified unit(benchmark) value, we can calculate the weight of each item, and then we can calculate the value of any pair of items by using their weights.
// O(e * v + q) time, O(v + e) space
function calcEquation(equations: string[][], values: number[], queries: string[][]): number[] {
    const itemSet = new Set(equations.flat());
    const n = itemSet.size;
    const itemMap = [...itemSet].reduce((res, cur, index) => {
        res[cur] = index;
        return res;
    }, {} as Record<string, number>);

    const weightUnitMap = new Map<number, number>(Array.from({ length: n }, (_, i) => [i, i])); // <index, unitIndex>: <2, 3> means [2] use [3] as unit to count weight
    const unitedMap = Array.from({ length: n }, (_, i) => [i]); // [..., [..., index]]: [[2, 4]]means [2] and [4] use [0] as unit to count weight
    const weights = Array(n).fill(1); // weight

    for (let i = 0; i < equations.length; i++) {
        const pair = equations[i];
        const index1 = itemMap[pair[0]];
        const index2 = itemMap[pair[1]];

        const index1Unit = weightUnitMap.get(index1) || index1;
        const index2Unit = weightUnitMap.get(index2) || index2;

        // (w[1] * u[1]) / (w[2] * u[2]) === v[i]
        // u[1] / u[2] = v[i] * w[2] / w[1]
        const transMultiplier = values[i] * weights[index2] / weights[index1];

        // now, change all items which used to use index1Unit as unit to use index2Unit
        unitedMap[index1Unit].forEach(index => {
            weights[index] = weights[index] * transMultiplier;
            weightUnitMap.set(index, index2Unit);
            unitedMap[index2Unit].push(index);
        });
        unitedMap[index1Unit] = [];
    }

    return queries.map(pair => {
        const index1 = itemMap[pair[0]];
        const index2 = itemMap[pair[1]];
        if (index1 === undefined || index2 === undefined) {
            return -1;
        }
        if (weightUnitMap.get(index1) !== weightUnitMap.get(index2)) {
            return -1;
        }
        return weights[index1] / weights[index2];
    });
};

// dfs search, cache the value in queryMap, so that we can avoid searching the same graph again and again
// O(q * v) time, O(v^2) space
function calcEquationDFS(equations: string[][], values: number[], queries: string[][]): number[] {
    const itemSet = new Set(equations.flat());
    const n = itemSet.size;
    const itemMap = [...itemSet].reduce((res, cur, index) => {
        res[cur] = index;
        return res;
    }, {} as Record<string, number>);

    const queryMap = Array.from({ length: n }, () => Array(n).fill(0));

    for (let i = 0; i < equations.length; i++) {
        const pair = equations[i];
        const index1 = itemMap[pair[0]];
        const index2 = itemMap[pair[1]];
        queryMap[index1][index2] = values[i];
        queryMap[index2][index1] = 1 / values[i];
    }

    const visitedSet = new Set<number>();
    const dfs = (indexCurrent: number, indexTarget: number, valueAccumulated: number): number => {
        if (indexCurrent === indexTarget) {
            return valueAccumulated;
        }
        for (let i = 0; i < n; i++) {
            if (queryMap[indexCurrent][i] > 0 && !visitedSet.has(i)) {
                visitedSet.add(i);
                const valueResult = dfs(i, indexTarget, valueAccumulated * queryMap[indexCurrent][i]);
                if (valueResult > 0) {
                    // cache in queryMap
                    queryMap[indexCurrent][indexTarget] = valueResult / valueAccumulated;
                    queryMap[indexTarget][indexCurrent] = valueAccumulated / valueResult;
                    return valueResult;
                }
            }
        }
        return -1;
    };

    const searchValue = (index1: number, index2: number) => {
        visitedSet.clear();
        return dfs(index1, index2, 1);
    };

    const res = queries.map(pair => {
        const index1 = itemMap[pair[0]];
        const index2 = itemMap[pair[1]];
        if (index1 === undefined || index2 === undefined) {
            return -1;
        }
        if (queryMap[index1][index2]) {
            return queryMap[index1][index2];
        }
        return searchValue(index1, index2);
    });

    return res;
};

// union graphs and cache the value in queryMap, so that we can avoid searching the same graph again and again
// O(e * v^2 + q) time, O(v^2) space
function calcEquationTreeUnion(equations: string[][], values: number[], queries: string[][]): number[] {
    const itemSet = new Set(equations.flat());
    const n = itemSet.size;
    const itemMap = [...itemSet].reduce((res, cur, index) => {
        res[cur] = index;
        return res;
    }, {} as Record<string, number>);
    console.log(itemMap);

    const queryMap = Array.from(
        { length: n },
        (_, i) => Array.from(
            { length: n },
            (__, j) => (+(i === j))
        )
    );

    const graphMap = new Map<number, Set<number>>();

    for (let i = 0; i < equations.length; i++) {
        const pair = equations[i];
        const index1 = itemMap[pair[0]];
        const index2 = itemMap[pair[1]];
        queryMap[index1][index2] = values[i];
        queryMap[index2][index1] = 1 / values[i];

        if (graphMap.has(index1)) {
            if (graphMap.has(index2)) {
                // union 2 graphs(trees)
                const tree1 = graphMap.get(index1);
                const tree2 = graphMap.get(index2);
                const newSet = new Set([...tree1!, ...tree2!]);
                for (const indexFrom1 of tree1!) {
                    for (const indexFrom2 of tree2!) {
                        queryMap[indexFrom1][indexFrom2] = queryMap[indexFrom1][index1] * queryMap[index1][index2] * queryMap[index2][indexFrom2];
                        queryMap[indexFrom2][indexFrom1] = 1 / queryMap[indexFrom1][indexFrom2];
                        graphMap.set(indexFrom2, newSet);
                    }
                    graphMap.set(indexFrom1, newSet);
                }
            }
            else {
                // join index2 into tree1
                graphMap.get(index1)!.add(index2);
                for (const indexFrom1 of graphMap.get(index1)!) {
                    queryMap[indexFrom1][index2] = queryMap[indexFrom1][index1] * queryMap[index1][index2];
                    queryMap[index2][indexFrom1] = 1 / queryMap[indexFrom1][index2];
                }
                graphMap.set(index2, graphMap.get(index1)!);
            }
        }
        else {
            if (graphMap.has(index2)) {
                // join index1 into tree2
                graphMap.get(index2)!.add(index1);
                for (const indexFrom2 of graphMap.get(index2)!) {
                    queryMap[indexFrom2][index1] = queryMap[indexFrom2][index2] * queryMap[index2][index1];
                    queryMap[index1][indexFrom2] = 1 / queryMap[indexFrom2][index1];
                }
                graphMap.set(index1, graphMap.get(index2)!);
            }
            else {
                // new tree
                const newSet = new Set([index1, index2]);
                graphMap.set(index1, newSet);
                graphMap.set(index2, newSet);
            }
        }
    }

    const res = queries.map(pair => {
        const index1 = itemMap[pair[0]];
        const index2 = itemMap[pair[1]];
        if (index1 === undefined || index2 === undefined) {
            return -1;
        }
        return queryMap[index1][index2] || -1;
    });

    return res;
};
