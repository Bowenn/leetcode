function canCompleteCircuit(gas: number[], cost: number[]): number {
    let tempGas = gas[0];
    let minGasLeftIndex = 0;
    let minGasLeft = 0;
    for (let i = 1; i < gas.length; i++) {
        if (minGasLeft > tempGas - cost[i - 1]) {
            minGasLeftIndex = i;
            minGasLeft = tempGas - cost[i - 1];
        }
        tempGas = tempGas - cost[i - 1] + gas[i];
    }
    if (minGasLeft > tempGas - cost[gas.length - 1]) {
        minGasLeftIndex = 0;
        minGasLeft = tempGas - cost[gas.length - 1];
    }
    tempGas = tempGas - cost[gas.length - 1] + gas[0];

    if (tempGas < gas[0]) {
        return -1;
    }
    return minGasLeftIndex;
};
