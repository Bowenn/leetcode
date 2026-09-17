function minCostClimbingStairs(cost: number[]): number {
    const tempCost: number[] = [0, 0]; // [min cost to reach step[0], min cost to reach step[1]]

    for (let i = 2; i < cost.length; i++) {
        tempCost.push(Math.min(
            tempCost[tempCost.length - 2] + cost[tempCost.length - 2],
            tempCost[tempCost.length - 1] + cost[tempCost.length - 1]
        ));
    }
    tempCost.push(Math.min(
        tempCost[tempCost.length - 2] + cost[tempCost.length - 2],
        tempCost[tempCost.length - 1] + cost[tempCost.length - 1]
    ));

    return tempCost[tempCost.length - 1];
};
