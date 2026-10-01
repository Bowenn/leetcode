function maxProfit(prices: number[]): number {
    let maxProfit = 0;
    let tempPrice = prices[0];
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] > tempPrice) {
            maxProfit += prices[i] - tempPrice;
        }
        tempPrice = prices[i];
    }

    return maxProfit;
};
