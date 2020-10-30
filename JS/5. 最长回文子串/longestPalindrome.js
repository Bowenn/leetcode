/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    let res = [0, 0, 0];
    for (let offset = 0, n = s.length; offset < n; offset++) {
        let i, j;
        for (i = 0; offset + i <= n && offset - i >= 0; i++) {
            if (s[offset + i] === s[offset - i]) {
                continue;
            }
            else {
                if (i >= res[1]) {
                    res[0] = offset;
                    res[1] = i;
                    res[2] = 0;
                }
                break;
            }
        }
        if (offset + i > n || offset - i < 0) {
            if (i >= res[1]) {
                res[0] = offset;
                res[1] = i;
                res[2] = 0;
            }
        }
        for (j = 1; offset + j <= n && offset - j + 1 >= 0; j++) {
            if (s[offset + j] === s[offset - j + 1]) {
                continue;
            }
            else {
                if (j > res[1]) {
                    res[0] = offset;
                    res[1] = j;
                    res[2] = 1;
                }
                break;
            }
        }
        if (offset + j > n || offset - j + 1 < 0) {
            if (j > res[1]) {
                res[0] = offset;
                res[1] = j;
                res[2] = 1;
            }
        }
    }
    return res[2] === 0
        ? s.slice(res[0] - res[1] + 1, res[0] + res[1])
        : s.slice(res[0] - res[1] + 2, res[0] + res[1]);
};