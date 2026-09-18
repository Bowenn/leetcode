function maxProfit(prices: number[], fee: number): number {
    const n = prices.length;
    const pArray = Array.from({ length: n }, () => ([0, 0])); // p[i][0] - not hold the stock in n; p[i][1] - hold
    // p[i][0] = max(p[i][1] + prices[i], p[i - 1][0])
    // p[i][1] = max(p[i - 1][1], p[i - 1][0] - prices[i] - fee)

    // profitMatrix[0][0] = 0;
    pArray[0][1] = -fee - prices[0];

    for (let i = 1; i < n; i++) {
        pArray[i][1] = Math.max(pArray[i - 1][1], pArray[i - 1][0] - prices[i] - fee);
        pArray[i][0] = Math.max(pArray[i][1] + prices[i], pArray[i - 1][0]);
    }

    return pArray[n - 1][0];
};
