/**
 * @param {string} s
 * @return {string[]}
 * 构建树，然后统计叶子
 */
 var permutation = function(s) {
    const res = [];
    const getS = (cur, left) => {
        if (left.length === 1) {
            res.push(cur + left);
            return;
        }
        else {
            const res = new Set();
            for (let i = 0; i < left.length; i++) {
                if (!res.has(left[i])) {
                    res.add(left[i]);
                    getS(cur + left[i], left.slice(0, i) + left.slice(i+1, left.length));
                }
            }
        }
    }

    getS('', s);

    return res;
};