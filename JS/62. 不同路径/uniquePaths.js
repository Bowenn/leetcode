/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
    // 可以表示为数学问题中的组合问题 C(n-1)(m-1 + n-1) 或 C(m-1)(m-1 + n-1)
    let t = 1;
    for (let i = 0; i < n - 1; i++) {
        t *= (m - 1) + (n - 1) - i;
        t /= i + 1;
    }
    return t;
};