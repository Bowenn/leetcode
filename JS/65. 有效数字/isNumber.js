/**
 * @param {string} s
 * @return {boolean}
 */

/* 正则解法 */
const isNumber = function (s) {
    const reg_0 = '[+-]?(?:[0-9]+\\.?[0-9]*|\\.[0-9]+)'; // 小数
    const reg_1 = '[+-]?[0-9]+'; // 整数
    const reg = new RegExp(`^(?:${reg_0}|${reg_1})([eE]${reg_1})?$`);
    return reg.test(s);
};
