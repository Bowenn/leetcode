/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
const combinationSum = function (candidates, target) {
    const res = [];
    candidates.sort((a, b) => a - b);

    const addANum = (cur_arr, cur_sum, base) => {
        for (let i = base; i < candidates.length; i++) {
            if (cur_sum + candidates[i] < target) {
                addANum(cur_arr.concat(candidates[i]), cur_sum + candidates[i], i);
            } else if (cur_sum + candidates[i] === target) {
                res.push(cur_arr.concat(candidates[i]));
            } else {
                return;
            }
        }
    };

    addANum([], 0, 0);

    return res;
};
