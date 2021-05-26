/* My Solution */

/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
const solveSudoku = function (board) {
    // 初始化含有1-9的Set
    const set0 = new Set();
    for (let i = 1; i <= 9; i++) {
        set0.add(i + '');
    }

    // 各维度可填写的剩余数字
    const possible_x = new Array(9).fill(null).map(item => new Set(set0)); // 每一横行剩余的可填写的数字
    const possible_y = new Array(9).fill(null).map(item => new Set(set0)); // 每一纵列剩余的可填写的数字
    const possible_block = new Array(9).fill(null).map(item => new Set(set0)); // 每一分宫格剩余的可填写的数字
    // 待填补的空位
    const blank = [];

    for (let i0 = 0; i0 < 3; i0++) {
        for (let j0 = 0; j0 < 3; j0++) {
            for (let i1 = 0; i1 < 3; i1++) {
                for (let j1 = 0; j1 < 3; j1++) {
                    // i0、j0表示分宫格的坐标，i1、j1表示分宫格内数字的坐标，方便理解我以i表示第几行，j表示第几列
                    const i = i0 * 3 + i1;
                    const j = j0 * 3 + j1;
                    const b = i0 * 3 + j0;
                    if (board[i][j] === '.') {
                        // 该位为空
                        blank.push({
                            i: i,
                            j: j,
                            b: b
                        });
                    } else {
                        // 该位为数字
                        possible_x[i].delete(board[i][j]);
                        possible_y[j].delete(board[i][j]);
                        possible_block[b].delete(board[i][j]);
                    }
                }
            }
        }
    }

    const fillABlank = () => {
        if (blank.length === 0) return true; // 数独没有空位了，当前填法可行

        const { i, j, b } = blank.shift();
        for (let n = 1; n <= 9; n++) {
            const m = n + '';
            if (possible_x[i].has(m) && possible_y[j].has(m) && possible_block[b].has(m)) {
                // 尝试将可能的数字填到这个位置
                board[i][j] = m;
                possible_x[i].delete(m);
                possible_y[j].delete(m);
                possible_block[b].delete(m);

                if (fillABlank()) {
                    // fillABlank返回true 说明该填法可行
                    return true;
                } else {
                    // fillABlank返回false 回滚该操作
                    board[i][j] = '.';
                    possible_x[i].add(m);
                    possible_y[j].add(m);
                    possible_block[b].add(m);
                }
            }
        }
        // 没有找到方法，将取出的填好的数字放回blank中
        blank.unshift({ i, j, b });
        return false;
    };

    fillABlank();
};

/* Best Solution 64ms */
/*
 * 和自己的解法相比主要有两个区别
 * 一是 用二进制来标记行、列、块维度的可用数字并进行二进制运算，而我是使用Set来进行保存用函数来操作，性能上会产生一些差距
 * 二是 每次挑选可能性最少的空白来填数，这样能够更早发现死路（当某个空白处没有可填数字即可剪枝），而我是按顺序进行遍历，在数据量很大的情况下我冗余的遍历会造成浪费
 */

/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
const solveSudoku0 = function (board) {
    new Sudoku(board).solve();
};

class Sudoku {
    constructor (board) {
        this.board = board;
        // 行
        this.rows = new Array(9).fill(0);
        // 列
        this.columns = new Array(9).fill(0);
        // 3x3方格
        this.boxs = Array.from({ length: 3 }, () => new Array(3).fill(0));
        // 未填空格
        this.emptyCells = new Set();
    }

    solve () {
        // 初始化已知的数字
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const num = this.board[i][j];
                if (num !== '.') {
                    // 将数字转化为二进制标记
                    // 1 -> 0b1, 2 -> 0b10, 3 -> 0b100, 4 -> 0b1000 ...
                    const sign = 1 << (Number(num) - 1);
                    this.rows[i] |= sign;
                    this.columns[j] |= sign;
                    this.boxs[Math.floor(i / 3)][Math.floor(j / 3)] |= sign;
                } else {
                    this.emptyCells.add((i << 4) | j);
                }
            }
        }
        // 主逻辑
        return this.fillNext();
    }

    fillNext () {
        const cellInfo = this.getEmptyCell();
        if (cellInfo === null) {
            // 没有空格，解题成功
            return true;
        }
        let [i, j, possible] = cellInfo;
        while (possible) {
            // 截取其中一个可能性
            const sign = ((possible - 1) & possible) ^ possible;
            // 填入空格
            this.fillCell(i, j, sign);
            // 继续下一个填充
            if (this.fillNext()) {
                // 填充成功
                return true;
            } else {
                // 排除当前数字
                possible ^= sign;
                // 清空空格
                this.cleanCell(i, j, sign);
            }
        }
        // 穷尽所有可能性，回溯
        return false;
    }

    getEmptyCell () {
        let min = 10;
        let cellInfo = null;
        for (const id of this.emptyCells) {
            const i = id >> 4; const j = id & 0b1111;
            const possible = this.getCellPossible(i, j);
            const count = this.countPossible(possible);
            if (min > count) {
                // 挑选可能性最少的格子，理论上可减少犯错回溯
                cellInfo = [i, j, possible];
                min = count;
            }
        }
        return cellInfo;
    }

    countPossible (possible) {
        // 计算二进制 1 的数量
        let count = 0;
        while (possible) {
            possible &= (possible - 1);
            count++;
        }
        return count;
    }

    fillCell (i, j, sign) {
        // 对应位变成1，标记占用
        this.rows[i] |= sign;
        this.columns[j] |= sign;
        this.boxs[Math.floor(i / 3)][Math.floor(j / 3)] |= sign;
        // 填入空格
        this.emptyCells.delete((i << 4) | j);
        this.board[i][j] = String(Math.log2(sign) + 1);
    }

    cleanCell (i, j, sign) {
        // 对应位变为0，清除占用
        this.rows[i] &= ~sign;
        this.columns[j] &= ~sign;
        this.boxs[Math.floor(i / 3)][Math.floor(j / 3)] &= ~sign;
        // 清空格子
        this.emptyCells.add((i << 4) | j);
        this.board[i][j] = '.';
    }

    getCellPossible (i, j) {
        // 获取格子可能的取值，二进制1表示可选
        return (this.rows[i] | this.columns[j] | this.boxs[Math.floor(i / 3)][Math.floor(j / 3)]) ^ 0b111111111;
    }
}
