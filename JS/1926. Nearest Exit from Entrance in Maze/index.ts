function nearestExit(maze: string[][], entrance: number[]): number {
    const m = maze.length;
    const n = maze[0].length;

    const toWalk: Array<[number, number, number]> = [[entrance[0], entrance[1], 0]];

    let minStep = Infinity;

    const walk = ([y, x, curStep]: [number, number, number]) => {
        if (
            curStep >= minStep // cut branch
            || maze[y][x] === '*'
        ) {
            return;
        }
        maze[y][x] = '*';
        if (
            !(y === entrance[0] && x === entrance[1])
            && (y === 0 || y === m - 1 || x === 0 || x === n - 1)
        ) {
            // reach edge
            minStep = curStep;
            return;
        }

        // next step
        if (
            x - 1 >= 0
            && maze[y][x - 1] === '.'
        ) {
            toWalk.push([y, x - 1, curStep + 1]);
        }
        if (
            x + 1 < n
            && maze[y][x + 1] === '.'
        ) {
            toWalk.push([y, x + 1, curStep + 1]);
        }
        if (
            y - 1 >= 0
            && maze[y - 1][x] === '.'
        ) {
            toWalk.push([y - 1, x, curStep + 1]);
        }
        if (
            y + 1 < m
            && maze[y + 1][x] === '.'
        ) {
            toWalk.push([y + 1, x, curStep + 1]);
        }
    };

    const iter = toWalk.entries();
    let iterObj = iter.next();

    while (!iterObj.done) {
        walk(iterObj.value[1]);
        iterObj = iter.next();
        if (Number.isFinite(minStep)) {
            return minStep;
        }
    }

    return -1;
};
