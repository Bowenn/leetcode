export {};

function numIslands(grid: string[][]): number {
    const m = grid.length;
    const n = grid[0].length;
    const walkIsland = (y: number, x: number): void => {
        grid[y][x] = '0';
        if (y - 1 >= 0 && grid[y - 1][x] === '1') {
            walkIsland(y - 1, x);
        }
        if (y + 1 < m && grid[y + 1][x] === '1') {
            walkIsland(y + 1, x);
        }
        if (x - 1 >= 0 && grid[y][x - 1] === '1') {
            walkIsland(y, x - 1);
        }
        if (x + 1 < n && grid[y][x + 1] === '1') {
            walkIsland(y, x + 1);
        }
    };

    let res = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === '1') {
                walkIsland(i, j);
                res++;
            }
        }
    }

    return res;
};
