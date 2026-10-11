export {};
function maxProfit(prices: number[]): number {
    let tempMin = prices[0];
    let maxProfit = 0;

    for (let i = 1; i < prices.length; i++) {
        maxProfit = Math.max(maxProfit, prices[i] - tempMin);
        tempMin = Math.min(tempMin, prices[i]);
    }

    return maxProfit;
};
