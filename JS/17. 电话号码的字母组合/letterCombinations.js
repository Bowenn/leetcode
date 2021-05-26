/**
 * @param {string} digits
 * @return {string[]}
 */
const letterCombinations = function (digits) {
    if (!digits) return [];

    const charMap = {
        2: ['a', 'b', 'c'],
        3: ['d', 'e', 'f'],
        4: ['g', 'h', 'i'],
        5: ['j', 'k', 'l'],
        6: ['m', 'n', 'o'],
        7: ['p', 'q', 'r', 's'],
        8: ['t', 'u', 'v'],
        9: ['w', 'x', 'y', 'z']
    };
    const l = digits.length;

    // 次慢
    const inputChar = (i, cur) => {
        if (i >= l) return cur;

        const t = [];
        let s;
        while (cur.length) {
            const s = cur.pop();
            t.push(...charMap[digits[i]].map(c => s + c));
        }
        return inputChar(
            i + 1,
            t
        );
    };
    return inputChar(0, ['']);
};
