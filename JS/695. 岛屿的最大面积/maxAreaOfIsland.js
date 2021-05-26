/**
 * @param {number[][]} grid
 * @return {number}
 */
const maxAreaOfIsland = function (grid) {
    const max_i = grid.length; const max_j = grid[0].length;
    const stoneSet = new Set();
    let max = 0;

    const stonePerimeter = (i, j) => {
        if (stoneSet.has(i * max_j + j)) return 0;
        stoneSet.add(i * max_j + j);

        let res = 1;
        if (i - 1 >= 0 && grid[i - 1][j] === 1) {
            res += stonePerimeter(i - 1, j);
        }
        if (j - 1 >= 0 && grid[i][j - 1] === 1) {
            res += stonePerimeter(i, j - 1);
        }
        if (i + 1 < max_i && grid[i + 1][j] === 1) {
            res += stonePerimeter(i + 1, j);
        }
        if (j + 1 < max_j && grid[i][j + 1] === 1) {
            res += stonePerimeter(i, j + 1);
        }
        return res;
    };

    for (let i = 0; i < max_i; i++) {
        for (let j = 0; j < max_j; j++) {
            if (grid[i][j] === 1) {
                const t = stonePerimeter(i, j);
                if (t > max) max = t;
            }
        }
    }

    return max;
};
