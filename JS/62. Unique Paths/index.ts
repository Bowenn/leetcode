// time complexity: O(m * n)
function uniquePaths(m: number, n: number): number {
    // dp[y][x] = dp[y - 1][x] + dp[y][x - 1]
    const dpMap = Array.from({ length: m }, () => Array(n).fill(1));

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dpMap[i][j] = dpMap[i - 1][j] + dpMap[i][j - 1];
        }
    }

    return dpMap[m - 1][n - 1];
};

function uniquePaths2(m: number, n: number): number {
    // 统计学：C[m][m + n] = (m + n)*(m + n - 1)*(m + n - 2)* ... * (m + n - m) / m * (m - 1) * ... * 1
    const total = m + n - 2;
    const smallerNum = Math.min(m, n) - 1;

    let up = 1;
    let down = 1;
    for (let i = 0; i < smallerNum; i++) {
        up *= total - i;
        down *= smallerNum - i;
    }

    return up / down;
};
