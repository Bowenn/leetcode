/**
 * @param {number[][]} grid
 * @return {number}
 */
const islandPerimeter = function (grid) {
    const max_i = grid.length; const max_j = grid[0].length;
    const grid0 = grid.map(item => [0, ...item, 0]);
    grid0.push(new Array(max_j + 2).fill(0));
    grid0.unshift(new Array(max_j + 2).fill(0));

    let res = 0;
    for (let i = 1; i < max_i + 1; i++) {
        for (let j = 1; j < max_j + 1; j++) {
            if (grid0[i][j] === 0) continue;
            if (grid0[i - 1][j] === 0) {
                res++;
            }
            if (grid0[i][j - 1] === 0) {
                res++;
            }
            if (grid0[i + 1][j] === 0) {
                res++;
            }
            if (grid0[i][j + 1] === 0) {
                res++;
            }
        }
    }
    return res;
};

/**
 * @description 从一个块开始向四方遍历，地图大岛屿小的时候这个方法可以避免遍历整个地图
 *              看上去更合理但实际用时和上面的方法没什么区别
 */
const islandPerimeter0 = function (grid) {
    const max_i = grid.length; const max_j = grid[0].length;
    const stoneSet = new Set();
    let res = 0;

    const stonePerimeter = (i, j) => {
        if (stoneSet.has(i * max_j + j)) return;
        stoneSet.add(i * max_j + j);

        if (i - 1 >= 0 && grid[i - 1][j] === 1) {
            stonePerimeter(i - 1, j);
        } else {
            res++;
        }
        if (j - 1 >= 0 && grid[i][j - 1] === 1) {
            stonePerimeter(i, j - 1);
        } else {
            res++;
        }
        if (i + 1 < max_i && grid[i + 1][j] === 1) {
            stonePerimeter(i + 1, j);
        } else {
            res++;
        }
        if (j + 1 < max_j && grid[i][j + 1] === 1) {
            stonePerimeter(i, j + 1);
        } else {
            res++;
        }
    };

    oneStone:
    for (let i = 0; i < max_i; i++) {
        for (let j = 0; j < max_j; j++) {
            if (grid[i][j] === 1) {
                stonePerimeter(i, j);
                break oneStone;
            }
        }
    }

    return res;
};
