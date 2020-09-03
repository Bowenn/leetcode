/**
 * @param {string} s
 * @return {boolean}
 */
var isNumber = function(s) {
    return !(s.match(/^ *$/g) || Number.isNaN(+s));
};