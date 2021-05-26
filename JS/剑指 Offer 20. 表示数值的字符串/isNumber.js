/**
 * @param {string} s
 * @return {boolean}
 */
const isNumber = function (s) {
    return !(s.match(/^ *$/g) || Number.isNaN(+s));
};
