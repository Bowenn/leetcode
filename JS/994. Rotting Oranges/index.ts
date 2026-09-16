function orangesRotting(grid: number[][]): number {
    let res = 0;
    let orangeLeft = 0;
    const toVisit: Array<[number, number]> = [];
    const m = grid.length;
    const n = grid[0].length;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                orangeLeft++;
            }
            else if (grid[i][j] === 2) {
                toVisit.push([i, j]);
            }
        }
    }

    if (!orangeLeft) {
        return 0;
    }

    if (!toVisit.length) {
        return -1;
    }

    let roundEndIndex = toVisit.length;
    let curIndex = 0;
    while (true) {
        res++;
        for (; curIndex < roundEndIndex; curIndex++) {
            const [y, x] = toVisit[curIndex];
            if (y - 1 >= 0 && grid[y - 1][x] === 1) {
                grid[y - 1][x] = 2;
                orangeLeft--;
                toVisit.push([y - 1, x]);
            }
            if (y + 1 < m && grid[y + 1][x] === 1) {
                grid[y + 1][x] = 2;
                orangeLeft--;
                toVisit.push([y + 1, x]);
            }
            if (x - 1 >= 0 && grid[y][x - 1] === 1) {
                grid[y][x - 1] = 2;
                orangeLeft--;
                toVisit.push([y, x - 1]);
            }
            if (x + 1 < n && grid[y][x + 1] === 1) {
                grid[y][x + 1] = 2;
                orangeLeft--;
                toVisit.push([y, x + 1]);
            }
            if (orangeLeft === 0) {
                return res;
            }
        }
        if (roundEndIndex === toVisit.length) {
            // unable to rot other oranges
            return -1;
        }
        roundEndIndex = toVisit.length;
    }
};
