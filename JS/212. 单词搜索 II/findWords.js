/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */

 /**
  * 待优化。。。
  */
var findWords0 = function(board, words) {
    const y = board.length;
    const x = board[0].length;
    const hasWords = new Array(words.length).fill(false);
    let res = []

    const map = new Array(y).fill(0).map(i => new Array(x).fill(0));
    const nextChar = (m, n, index, word) => {
        if (m < 0 || m >= y || n < 0 || n >= x) {
            // 走出边界
            return false;
        }
        else if (board[m][n] !== word[index]|| map[m][n] === 1) {
            // 单词不对或之前走过的地方
            return false;
        }
        else {
            if (index === word.length - 1) {
                return true;
            }

            // 可以继续走，标记已经走过
            map[m][n] = 1;

            // 向四个方向尝试
            if (nextChar(m + 1, n, index + 1, word) 
                || nextChar(m - 1, n, index + 1, word)
                || nextChar(m, n + 1, index + 1, word)
                || nextChar(m, n - 1, index + 1, word)
            ) {
                map[m][n] = 0;
                return true;
            }
            else {
                // 回退
                map[m][n] = 0;
                return false;
            }
        }
    }

    for (let i = 0; i < y; i++) {
        for (let j = 0; j < x; j++) {
            for (let k = 0; k < words.length; k++) {
                if (!hasWords[k] && nextChar(i, j, 0, words[k])){
                    hasWords[k] = true;
                    res.push(words[k]);
                }
            }
        }
    }

    return res;
};