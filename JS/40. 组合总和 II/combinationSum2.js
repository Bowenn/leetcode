/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
    let res = [];
    candidates.sort((a, b) => a - b);

    const addANum = (cur_arr, cur_sum, base) => {
        for (let i = base; i < candidates.length; i++) {
            // 去重，在选取到当前轮次的重复项时过滤
            if (candidates[i] === candidates[i - 1] && i > base) continue;
            if (cur_sum + candidates[i] < target) {
                addANum(cur_arr.concat(candidates[i]), cur_sum + candidates[i], i + 1);
            }
            else if (cur_sum + candidates[i] === target) {
                res.push(cur_arr.concat(candidates[i]));
            }
            else {
                return;
            }
        }
        return
    }
    
    addANum([], 0, 0);
    
    return res;
};