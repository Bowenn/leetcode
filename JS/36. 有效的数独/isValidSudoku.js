/**
 * @param {character[][]} board
 * @return {boolean}
 */
const isValidSudoku = function (board) {
    // 各维度可填写的剩余数字
    const possible_x = new Array(9).fill(null).map(item => new Set()); // 每一横行
    const possible_y = new Array(9).fill(null).map(item => new Set()); // 每一纵列
    const possible_block = new Array(9).fill(null).map(item => new Set()); // 每一子块

    for (let i0 = 0; i0 < 3; i0++) {
        for (let j0 = 0; j0 < 3; j0++) {
            for (let i1 = 0; i1 < 3; i1++) {
                for (let j1 = 0; j1 < 3; j1++) {
                    // i0、j0表示分宫格的坐标，i1、j1表示分宫格内数字的坐标，方便理解我以i表示第几行，j表示第几列
                    const i = i0 * 3 + i1;
                    const j = j0 * 3 + j1;
                    const b = i0 * 3 + j0;
                    if (board[i][j] !== '.') {
                        if (possible_x[i].has(board[i][j])) return false;
                        else possible_x[i].add(board[i][j]);
                        if (possible_y[j].has(board[i][j])) return false;
                        else possible_y[j].add(board[i][j]);
                        if (possible_block[b].has(board[i][j])) return false;
                        else possible_block[b].add(board[i][j]);
                    }
                }
            }
        }
    }

    return true;
};
