/**
 * @param {number} num
 * @return {string}
 */

/* 做一个字表而已 */
const intToRoman = function(num) {
    const numMap = [
        [], // 0
        [0], // 1
        [0, 0], // 2
        [0, 0, 0], // 3
        [0, 1], // 4
        [1], // 5
        [1, 0], // 6
        [1, 0, 0], // 7
        [1, 0, 0, 0], // 8
        [0, 2] // 9
    ];
    const charMap = [
        ['I', 'V', 'X'],
        ['X', 'L', 'C'],
        ['C', 'D', 'M'],
        ['M']
    ];
    const numArr = [];
    while(num) {
        numArr.push(num % 10);
        num = (num - num % 10) / 10;
    }
    return numArr.map((n, index) => numMap[n].map(i => charMap[index][i]))
        .reverse().flat().join('');
};