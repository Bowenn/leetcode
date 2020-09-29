/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {

    const y = board.length;
    const x = board[0].length;
    const l = word.length;

    const map = new Array(y).fill(0).map(i => new Array(x).fill(0));
    const nextChar = (m, n, index) => {
        if (m < 0 || m >= y || n < 0 || n >= x) {
            // 走出边界
            return false;
        }
        else if (board[m][n] !== word[index]|| map[m][n] === 1) {
            // 单词不对或之前走过的地方
            return false;
        }
        else {
            if (index === l - 1) {
                return true;
            }

            // 可以继续走，标记已经走过
            map[m][n] = 1;

            // 向四个方向尝试
            if (nextChar(m + 1, n, index + 1) 
                || nextChar(m - 1, n, index + 1)
                || nextChar(m, n + 1, index + 1)
                || nextChar(m, n - 1, index + 1)
            ) {
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
            if (nextChar(i, j, 0)){
                return true;
            }
        }
    }
    return false;
};