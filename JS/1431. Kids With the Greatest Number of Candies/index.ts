function kidsWithCandies(candies: number[], extraCandies: number): boolean[] {
    let threshold = candies[0];
    for (let i = 1; i < candies.length; i++) {
        threshold = Math.max(threshold, candies[i]);
    }
    return candies.map(item => {
        return item + extraCandies >= threshold;
    });
};
