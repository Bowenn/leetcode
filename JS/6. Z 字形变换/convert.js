/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
    if (numRows <= 1) return s;

    let m = (numRows - 2) * 2 + 2;
    let res_arr = new Array(numRows).fill(0).map(item => '');
    for (let i = 0; i < s.length; i++) {
        let t = i % m;
        if (t >= numRows) t = m - t;
        res_arr[t] += s[i];
    }
    return res_arr.join('');
};