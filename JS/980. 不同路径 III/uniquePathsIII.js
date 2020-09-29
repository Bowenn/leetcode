/**
 * @param {number[][]} grid
 * @return {number}
 */
var uniquePathsIII = function(grid) {
    const y = grid.length;
    const x = grid[0].length;
    let wayCount = 0;

    const map = new Array(y).fill(0).map(i => new Array(x).fill(0));
    const goOneStep = (m, n) => {
        if (m < 0 || m >= y || n < 0 || n >= x) {
            // 走出边界
            return;
        }
        else if (grid[m][n] === -1 || map[m][n] === 1) {
            // 走到障碍物或之前走过的地方
            return;
        }
        else if (grid[m][n] === 2) {
            // 走到终点，查看方格是否全部走完
            map[m][n] = 1; // 标记当前已经走过
            if (checkMap()) {
                wayCount++;
            }
            map[m][n] = 0; // 回退
            return;
        }
        else {
            // 可以继续走
            map[m][n] = 1; // 标记已经走过

            // 向四个方向尝试
            goOneStep(m + 1, n);
            goOneStep(m - 1, n);
            goOneStep(m, n + 1);
            goOneStep(m, n - 1);

            // 回退
            map[m][n] = 0;
            return;
        }
    }

    const checkMap = () => {
        for (let i = 0; i < y; i++) {
            for (let j = 0; j < x; j++) {
                if (grid[i][j] === 0 && map[i][j] === 0) {
                    // 有格子没被走过
                    return false;
                }
            }
        }
        return true;
    }

    let startM, startN;
    // 找到起点
    findO:{
        for (let i = 0; i < y; i++) {
            for (let j = 0; j < x; j++) {
                if (grid[i][j] === 1) {
                    [startM, startN] = [i, j];
                    break findO;
                }
            }
        }
    }
    goOneStep(startM, startN);
    
    return wayCount;
};