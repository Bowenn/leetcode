

// KMP algorithm, O(m+n) solution, n = haystack.length, m = needle.length
function strStr(haystack: string, needle: string): number {
    // 1. build lpsMap
    const lpsMap = Array(needle.length).fill(0);
    for (let i = 1; i < needle.length; i++) {
        let prev = lpsMap[i - 1];
        while (needle[i] !== needle[prev] && prev - 1 >= 0) {
            prev = lpsMap[prev - 1];
        }
        if (needle[i] === needle[prev]) {
            lpsMap[i] = prev + 1;
        }
    }

    // 2. match string
    let indexN = 0;
    let indexM = 0;

    while (indexN < haystack.length) {
        if (haystack[indexN] === needle[indexM]) {
            indexN++;
            indexM++;
            if (indexM === needle.length) { // matched
                return indexN - indexM;
            }
        }
        else {
            if (indexM === 0) {
                indexN++;
            }
            else {
                indexM = lpsMap[indexM - 1];
            }
        }
    }

    return -1;
};


/*
Notes:

为什么 prev-- 在逻辑上是错的？
假设我们正在构建模式串 needle = "abacabab" 的 lpsMap。

当你处理到最后一个字符 'b'（索引 i = 7）时，前面的情况是这样的：

目前正在检查的子串是 "abacaba"（索引 0 到 6）。

它的最长公共前后缀是 "aba"，长度为 3。所以此时 prev = 3。

现在我们要看下一个字符，也就是比较 needle[i] (索引 7 的 'b') 和 needle[prev] (索引 3 的 'c')。

因为 'b' !== 'c'，匹配失败了，我们需要回退。

如果使用 prev--（错误做法）：
prev 会变成 2。这意味着你想看看长度为 2 的前缀 "ab" 是不是当前状态的合法后缀。
于是你拿 needle[7] ('b') 去和 needle[2] ('a') 比较，发现不匹配，再继续退。
但问题是： 我们根本不需要比较！因为前面的状态告诉我们，原串末尾那三个字符是 "aba"，它的后缀是 "ba"，而你要找的前缀是 "ab"，"ab" !== "ba"。尝试长度为 2 的前缀从根本上就是无效的，你只是在碰运气。

如果使用 prev = lpsMap[prev - 1]（正确做法）：
匹配在索引 3 ('c') 处失败，说明前缀 "abac" 走不通了。但是，我们已经确信前面的部分 "aba"（即 needle[0...2]）是完全匹配的。
现在我们要找的是：在已经匹配的 "aba" 中，次长的公共前后缀是多少？
这个答案早就计算好并存在 lpsMap[2] 里了！

lpsMap[2] 代表 "aba" 的最长公共前后缀，它的值是 1（也就是字符串 "a"）。

所以，我们将 prev 精准地更新为 lpsMap[3 - 1]，即 prev = 1。

这意味着：我们知道前缀有一个 'a'，后缀也有一个 'a'，这部分不用再比了。我们直接拿 needle[7] ('b') 和下一个字符 needle[1] ('b') 进行比较。
它们相等！于是新的 prev 变成了 2，当前位置的 LPS 长度就是 2。
// normal O(m*n) solution, m = haystack.length, n = needle.length
function strStr1(haystack: string, needle: string): number {
    for (let i = 0; i + needle.length <= haystack.length; i++) {
        if (haystack.substring(i, i + needle.length) === needle) {
            return i;
        }
    }
    return -1;
};

*/

// basic O(m*n) solution, m = haystack.length, n = needle.length
function strStr2(haystack: string, needle: string): number {
    const searching: number[][] = []; // [needleIndex, startIndex]
    for (let i = 0; i < haystack.length; i++) {
        const char = haystack[i];
        for (let j = 0; j < searching.length; j++) {
            if (searching[j][0] > 0 && char === needle[searching[j][0]]) {
                searching[j][0]++;
                if (searching[j][0] === needle.length) {
                    return searching[j][1];
                }
            }
            else {
                searching[j][0] = -1;
            }
        }
        if (char === needle[0]) {
            if (needle.length === 1) {
                return i;
            }
            searching.push([1, i]);
        }
    }
    return -1;
};
