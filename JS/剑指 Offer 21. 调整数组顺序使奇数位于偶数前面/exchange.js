/**
 * @param {number[]} nums
 * @return {number[]}
 */
const exchange = function (nums) {
    nums.sort((a, b) => b % 2 - a % 2);
    return nums;
};
