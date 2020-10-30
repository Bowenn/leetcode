/**
 * @param {number[]} arr
 * @return {boolean}
 */
var uniqueOccurrences = function(arr) {
    const counter = {};
    arr.sort();
    let t = arr[0], c = 0;
    for (let i of arr) {
        if (i === t) {
            c++;
        }
        else {
            if (counter[c]) return false;
            else {
                counter[c] = t;
                t = i;
                c = 1;
            }
        }
    }
    if (counter[c]) return false;
    return true;
};