/**
 * @param {number[]} arr
 * @return {boolean}
 */
const uniqueOccurrences = function (arr) {
    const counter = {};
    arr.sort();
    let t = arr[0]; let c = 0;
    for (const i of arr) {
        if (i === t) {
            c++;
        } else {
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
