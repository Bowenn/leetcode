/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
    if (!k) return [];

    let res = [];
    const dfs = (cur_arr, base) => {
        for (let i = base; k - cur_arr.length <= n - i + 1; i++) {
            if (cur_arr.length + 1 === k) {
                res.push(cur_arr.concat(i));
            }
            else {
                dfs(cur_arr.concat(i), i + 1);
            }
        }
    }

    dfs([], 1);

    return res;
};