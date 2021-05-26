/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
const combine = function (n, k) {
    if (!k) return [];

    const res = [];
    const dfs = (cur_arr, base) => {
        for (let i = base; k - cur_arr.length <= n - i + 1; i++) {
            if (cur_arr.length + 1 === k) {
                res.push(cur_arr.concat(i));
            } else {
                dfs(cur_arr.concat(i), i + 1);
            }
        }
    };

    dfs([], 1);

    return res;
};
