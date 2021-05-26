/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const permute = function (nums) {
    let res = [[]];

    const insertNum = (arr, num) => {
        const t = [];
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j <= arr[i].length; j++) {
                t.push([].concat(arr[i].slice(0, j), num, arr[i].slice(j)));
            }
        }
        return t;
    };

    let temp;
    while ((temp = nums.pop()) !== undefined) {
        res = insertNum(res, temp);
    }
    return res;
};
