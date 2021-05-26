/**
 * @param {number[]} arr
 * @return {number[]}
 */
const sortByBits = function (arr) {
    const temp = arr.map(n => ({
        v: n,
        i: [...Number(n).toString(2).matchAll(/1/g)].length
    }));
    temp.sort((a, b) => a.i - b.i || a.v - b.v);
    return temp.map(n => n.v);
};
