/**
 * @param {number[]} arr
 * @return {number}
 */
const maximumElementAfterDecrementingAndRearranging = function(arr) {
    const arrSorted = [...arr].sort((a, b) => a - b);
    return arrSorted.reduce((max, cur) => {
        if (cur > max) {
            return max + 1;
        }
        else {
            return max
        }
    }, 0);
};