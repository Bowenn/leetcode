
// after optimization
// O(n * m), O(n) space
function coinChange(coins: number[], amount: number): number {
    // dp[i][j]: i means amount, j means coins
    // dp[i][j] = Math.min(
    //              dp[i][j - 1], // not add j coin
    //              dp[i - coins[j]][j] + 1, // add one j coin
    // below cases has already been handled within `dp[i - coins[j]][j] + 1`
    //              dp[i - (coins[j] - coins[j - 1])][j - 1], // replace one j-1 coin with one j coin
    //              dp[i - (coins[j] - coins[j - 2])][j - 2], // replace one j-2 coin with one j coin
    //              dp[i - (coins[j] - coins[j - n])][j - n], // replace one j-n coin with one j coin
    //  )

    const dpArray: number[] = Array(amount + 1).fill(Infinity);
    dpArray[0] = 0;

    for (let j = 0; j < coins.length; j++) {
        for (let i = 0; i <= amount; i++) {
            if (i >= coins[j]) {
                dpArray[i] = Math.min(dpArray[i], dpArray[i - coins[j]] + 1);
            }
        }
    }
    // console.log(dpArray);

    return Number.isFinite(dpArray[amount]) ? dpArray[amount] : -1;
};

// before optimization, O(n * m) time, O(n * m) space
function coinChange1(coins: number[], amount: number): number {
    // dp[i][j]: i means amount, j means coins
    // dp[i][j] = Math.min(
    //              dp[i][j - 1], // not add j coin
    //              dp[i - coins[j]][j] + 1, // add one j coin
    // below cases has already been handled within `dp[i - coins[j]][j] + 1`
    //              dp[i - (coins[j] - coins[j - 1])][j - 1], // replace one j-1 coin with one j coin
    //              dp[i - (coins[j] - coins[j - 2])][j - 2], // replace one j-2 coin with one j coin
    //              dp[i - (coins[j] - coins[j - n])][j - n], // replace one j-n coin with one j coin
    //  )

    const dpMap: number[][] = Array.from({ length: amount + 1 }, () => Array(coins.length).fill(Infinity));
    dpMap[0][0] = 0;

    for (let j = 0; j < coins.length; j++) {
        for (let i = 0; i <= amount; i++) {
            if (j > 0) {
                dpMap[i][j] = Math.min(dpMap[i][j], dpMap[i][j - 1]);
            }
            if (i >= coins[j]) {
                dpMap[i][j] = Math.min(dpMap[i][j], dpMap[i - coins[j]][j] + 1);
            }
        }
    }
    // console.log(dpMap);

    return Number.isFinite(dpMap[amount][coins.length - 1]) ? dpMap[amount][coins.length - 1] : -1;
};
