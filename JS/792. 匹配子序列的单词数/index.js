/**
 * @param {string} s
 * @param {string[]} words
 * @return {number}
 */

/* 其实和sb方法差不多，只是用indexOf替换了for遍历，谁能想到性能提升这么大 148ms */
const numMatchingSubseq = function(s, words) {
    // 是不是子序列
    const isSubseq = (sub, main) => {
        let p = -1;
        for (let i = 0; i < sub.length; i++) {
            p = main.indexOf(sub[i], p + 1);
            if (p < 0) return false
        }
        return true;
    };

    return words.reduce((res, cur) => {isSubseq(cur, s) && res++; return res;}, 0);
};

/* 字符串转换为[char, count]后再扫一遍整个字符串，如果要搜索的字符串有很多重复的话性能相比应该会显得更好 788ms */
const numMatchingSubseq0 = function(s, words) {
    const sSplited = []
    s.split('').reduce((pre, cur) => {
        if (pre[0] === cur) {
            pre[1]++;
            return pre;
        }
        else {
            cur = [cur, 1];
            sSplited.push(cur);
            return cur;
        }
    }, ['', 0]);

    const wordsSplited = words.map(w => {
        const wSplited = [];
        w.split('').reduce((pre, cur) => {
            if (pre[0] === cur) {
                pre[1]++;
                return pre;
            }
            else {
                cur = [cur, 1];
                wSplited.push(cur);
                return cur;
            }
        }, ['', 0]);
        return wSplited;
    });

    let flag = true
    for (let i = 0; i < sSplited.length && flag; i++) {
        flag = false;
        wordsSplited.forEach(word => {
            if (!word.length) return;
            if (sSplited[i][0] === word[0][0]) {
                word[0][1] -= sSplited[i][1];
                if (word[0][1] <= 0) {
                    word.shift();
                }
            }
            if (flag || word.length) {
                flag = true;
            }
        });
    }
    
    return wordsSplited.filter(word => word.length === 0).length;    
};

/* sb方法，遍历 8356 ms */
const numMatchingSubseq1 = function (s, words) {
    // 是不是子序列
    const isSubseq = (sub, main) => {
        let i = 0, j = 0;
        for (; i + sub.length - j <= main.length; i++) {
            if (main[i] === sub[j]) {
                j++;
                if (j >= sub.length) {
                    return true;
                }
            }
        }
        return false;
    };

    return words.reduce((res, cur) => {isSubseq(cur, s) && res++; return res;}, 0);
};
