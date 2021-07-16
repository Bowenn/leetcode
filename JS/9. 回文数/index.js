/**
 * @param {number} x
 * @return {boolean}
 */
const isPalindrome = function(x) {
    const s = '' + x;
    for (let i = 0; i * 2 <= s.length; i++) {
        if (s[i] !== s[s.length - 1 - i]) {
            return false;
        }
    }
    return true;
};