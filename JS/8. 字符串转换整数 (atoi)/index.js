/**
 * @param {string} s
 * @return {number}
 */
const myAtoi = function(s) {
    const MIN = -Math.pow(2, 31);
    const MAX = -MIN - 1;

    const [, signS, numS] = /^ *([+-]?)([0-9]*)/g.exec(s);
    const num = +(signS + (+numS));
    return num <= MIN ? MIN
        : num <= MAX ? num
        : MAX;
};