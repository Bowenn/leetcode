/**
 * @param {number} n - a positive integer
 * @return {number}
 */
/* 取巧算法 */
const hammingWeight0 = function (n) {
    let res = 0;
    while (n > 0) {
        n % 2 && res++;
        n >>>= 1;
        // n = n >>> 1;
        /**
         * 第一次感受到 >>>= 和 =  >>> 的效率差距
         * 前者80ms，后者102ms，性能真的会提升
         */
    }
    return res;
};

/* 一般算法，转换成二进制数字的string查1的个数 */
const hammingWeight1 = function (n) {
    const nStr = n.toString(2);
    let res = 0;
    for (let i = 0; i < nStr.length; i++) {
        if (nStr[i] === '1') {
            res++;
        }
    }
    return res;
};
