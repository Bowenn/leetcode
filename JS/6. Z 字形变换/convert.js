/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
const convert = function (s, numRows) {
    if (numRows <= 1) return s;

    const m = (numRows - 2) * 2 + 2;
    const res_arr = new Array(numRows).fill(0).map(item => '');
    for (let i = 0; i < s.length; i++) {
        let t = i % m;
        if (t >= numRows) t = m - t;
        res_arr[t] += s[i];
    }
    return res_arr.join('');
};
