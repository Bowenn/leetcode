/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const findPairs = function (nums, k) {
    nums.sort((a, b) => a - b);
    let count = 0;
    const s1 = new Set();
    let t;
    while ((t = nums.pop()) !== undefined) {
        if (nums.indexOf(t - k) >= 0 && !s1.has(t)) {
            count++;
            s1.add(t);
        }
    }
    return count;
};
