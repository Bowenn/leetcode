/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */

/* 又是dp，我dp还是用的太少了，总是偏往dfs的方向 */
const isMatch = function (s, p) {
    if (s == null || p == null) return false;

    const sLen = s.length, pLen = p.length;

    const dp = new Array(sLen + 1);
    for (let i = 0; i < dp.length; i++) {
        dp[i] = new Array(pLen + 1).fill(false); // 将项默认为false
    }
    // base case
    dp[0][0] = true;
    for (let j = 1; j < pLen + 1; j++) {
        if (p[j - 1] == "*") dp[0][j] = dp[0][j - 2];
    }
    // 迭代
    for (let i = 1; i < sLen + 1; i++) {
        for (let j = 1; j < pLen + 1; j++) {

            if (s[i - 1] == p[j - 1] || p[j - 1] == ".") {
                dp[i][j] = dp[i - 1][j - 1];
            } else if (p[j - 1] == "*") {
                if (s[i - 1] == p[j - 2] || p[j - 2] == ".") {
                    dp[i][j] = dp[i][j - 2] || dp[i - 1][j - 2] || dp[i - 1][j];
                } else {
                    dp[i][j] = dp[i][j - 2];
                }
            }
        }
    }
    return dp[sLen][pLen]; // 长sLen的s串 是否匹配 长pLen的p串
};


/* 试了下stack（dfs） 188ms */
const isMatch0 = function (s, p) {
    let ppArr = [], a = -1, b = 0;
    while ((a = p.indexOf('*', b)) >= 0) {
        b !== a - 1 && ppArr.push(p.slice(b, a - 1)); // 不含*的部分
        ppArr.push(p.slice(a - 1, a + 1)); // 含*的部分
        b = a + 1;
    }
    if (b !== p.length) {
        // 末尾部分
        ppArr.push(p.slice(b));
    }

    ppArr = ppArr.map(pp => {
        if (pp.length === 1 || pp[1] === '*' || pp.indexOf('.') < 0) {
            // 单字符或含'*'部分不变或不包含'.'
            return pp;
        }
        else {
            const ppSubArr = [];
            let t = -1;
            while ((t = pp.indexOf('.')) >= 0) {
                ppSubArr.push(pp.slice(0, t));
                ppSubArr.push('.');
                pp = pp.slice(t + 1);
            }
            pp && ppSubArr.push(pp);
            return ppSubArr;
        }
    }).flat();

    const ppMatch = s => {
        if (ppArr.length === 0) {
            return s === '';
        }
        const pp = ppArr.shift(); // 取一个匹配子段
        if (pp === '.') {
            // '.'匹配
            if (s[0] && ppMatch(s.slice(1))) {
                return true;
            }
        }
        else if (pp[1] !== '*') {
            // 纯字符匹配
            if (s.indexOf(pp) === 0 && ppMatch(s.slice(pp.length))) {
                return true;
            }
        }
        else {
            // '*'匹配，需要考虑'.'和贪婪非贪婪模式，循环一下
            if (ppMatch(s)) {
                // 先试试*匹配个数为0的时候，如果可以就返回true
                return true;
            }
            for (let i = 0; i < s.length; i++) {
                if (s[i] !== pp[0] && pp[0] !== '.') {
                    break;
                }
                if (ppMatch(s.slice(i + 1))) {
                    return true;
                }
            }

        }
        ppArr.unshift(pp);
        return false;
    };

    return ppMatch(s);
};



/* 做个弊 */
const isMatch1 = function (s, p) {
    return Boolean(new RegExp('^' + p + '$').exec(s));
};