/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
    const max_i = grid.length, max_j = grid[0].length;
    let stoneSet = new Set();
    let count = 0;

    const stonePerimeter = (i, j) => {
        if (stoneSet.has(i * max_j + j)) return;
        stoneSet.add(i * max_j + j);

        if (i - 1 >= 0 && grid[i - 1][j] === '1') {
            stonePerimeter(i - 1, j);
        }
        if (j - 1 >= 0 && grid[i][j - 1] === '1') {
            stonePerimeter(i, j - 1);
        }
        if (i + 1 < max_i && grid[i + 1][j] === '1') {
            stonePerimeter(i + 1, j);
        }
        if (j + 1 < max_j && grid[i][j + 1] === '1') {
            stonePerimeter(i, j + 1);
        }
        return;
    }

    for (let i = 0; i < max_i; i++) {
        for (let j = 0; j < max_j; j++) {
            if (grid[i][j] === '1' && !stoneSet.has(i * max_j + j)) {
                count++;
                stonePerimeter(i, j);
            }
        }
    }

    return count;
};