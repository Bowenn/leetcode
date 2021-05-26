/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */

/* 88ms。真快 */
/**
 * 实际操作起来才发现这种方法是多么简单，要开拓思路了，要灵活运用这种方法
 * 基本上这种类似递归的图都可以用这种方式
 */
const uniquePathsWithObstacles = function (obstacleGrid) {
    const y = obstacleGrid.length; // Y轴
    const x = obstacleGrid[0].length; // X轴

    // 先判断下边界情况
    if (obstacleGrid[0][0] === 1 || obstacleGrid[y - 1][x - 1] === 1) {
        return 0;
    }

    // 从起点开始计算起点到每个格子的路径
    const map = new Array(y).fill(0).map(item => new Array(x).fill(0));
    map[0][0] = 1;

    // 上边界的横边遇到障碍物之前都是只有一条路径
    for (let i = 0; i < x; i++) {
        if (obstacleGrid[0][i] === 1) break;
        map[0][i] = 1;
    }
    // 左边界同理
    for (let i = 0; i < y; i++) {
        if (obstacleGrid[i][0] === 1) break;
        map[i][0] = 1;
    }

    // 开始填充
    for (let i = 1; i < y; i++) {
        for (let j = 1; j < x; j++) {
            if (obstacleGrid[i][j] === 1) {
                map[i][j] = 0;
            } else {
                map[i][j] = map[i - 1][j] + map[i][j - 1];
            }
        }
    }

    return map[y - 1][x - 1];
};

/* 超时啦。。。。 */
/**
 * 这个方法的思路是将整个地图根据障碍物进行分块，先算没有障碍物的，再减去经过某个障碍物的路径，得出结果
 * 不用缓存很快就超时了，用缓存也超时，在障碍物多的情况下性能实在是堪忧，准备换个思路考虑考虑之前的dp的递推方式
 */
const uniquePathsWithObstacles0 = function (obstacleGrid) {
    const y = obstacleGrid.length; // Y轴
    const x = obstacleGrid[0].length; // X轴
    if (obstacleGrid[0][0] === 1 || obstacleGrid[y - 1][x - 1] === 1) return 0;
    // 分别用于缓存`uniquePaths`和`uniquePathsWithO`函数结果
    const tempU = {};
    const tempUO = {};

    const uniquePaths = (m, n) => {
        if (m <= 0 ||
            n <= 0
        ) {
            return 0;
        }
        // 看看是否有之前缓存的结果
        if (tempU[[m - 1, n - 1]]) return tempU[[m - 1, n - 1]];

        // 可以表示为数学问题中的组合问题 C(n-1)(m-1 + n-1) 或 C(m-1)(m-1 + n-1)
        let t = 1;
        for (let i = 0; i < n - 1; i++) {
            t *= (m - 1) + (n - 1) - i;
            t /= i + 1;
        }

        // 缓存一下
        tempU[[m - 1, n - 1]] = t;
        tempU[[n - 1, m - 1]] = t;
        return t;
    };

    const uniquePathsWithO = (m, n, offsetY, offsetX) => {
        if (m <= 0 ||
            n <= 0 ||
            obstacleGrid[offsetY][offsetX] === 1 ||
            obstacleGrid[offsetY + m - 1][offsetX + n - 1] === 1
        ) {
            return 0;
        }

        // 看看是否有之前缓存的结果
        if (tempUO[[m, n, offsetY, offsetX]]) return tempUO[[m, n, offsetY, offsetX]];

        let total = uniquePaths(m, n);
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                if (obstacleGrid[offsetY + i][offsetX + j] === 1) {
                    total -= (
                        uniquePathsWithO(i + 1, j, offsetY, offsetX) +
                        uniquePathsWithO(i, j + 1, offsetY, offsetX)
                    ) * (
                        uniquePaths(m - i - 1, n - j) +
                        uniquePaths(m - i, n - j - 1)
                    );
                }
            }
        }
        tempUO[[m, n, offsetY, offsetX]] = total;
        return total;
    };

    return uniquePathsWithO(y, x, 0, 0);
};
