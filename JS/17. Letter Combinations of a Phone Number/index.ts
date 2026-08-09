/* eslint-disable quote-props */
const digMap: Record<string, string[]> = {
    '2': ['a', 'b', 'c'],
    '3': ['d', 'e', 'f'],
    '4': ['g', 'h', 'i'],
    '5': ['j', 'k', 'l'],
    '6': ['m', 'n', 'o'],
    '7': ['p', 'q', 'r', 's'],
    '8': ['t', 'u', 'v'],
    '9': ['w', 'x', 'y', 'z']
};

function letterCombinations(digits: string): string[] {
    const n = digits.length;
    const res: string[] = [];

    const dfs = (depth: number = 0, temp: string = '') => {
        if (depth === n - 1) {
            digMap[digits[depth]].forEach(c => {
                res.push(temp + c);
            });
        }
        else {
            digMap[digits[depth]].forEach(c => {
                dfs(depth + 1, temp + c);
            });
        }
    };

    dfs();

    return res;
};
