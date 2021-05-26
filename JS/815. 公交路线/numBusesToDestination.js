/**
 * @param {number[][]} routes
 * @param {number} S
 * @param {number} T
 * @return {number}
 */

/* My Solution 1.0 超出时间限制。。。4800ms */
/*
   改变思路，由绘制车站-车站的图改为绘制路线-路线的图，时间比0.0有所缩短，但还是超时
 */
const numBusesToDestination10 = function (routes, S, T) {
    if (S === T) return 0;

    const n = routes.length;
    const routesMap = new Array(n).fill(0).map(item => new Array(n).fill(Infinity));
    const sSet = new Set(); const tSet = new Set();

    const checkArr = (i, j) => {
        // 检查两路线是否相交（可以换乘）
        for (const r of routes[i]) {
            if (routes[j].indexOf(r) >= 0) {
                return true;
            }
        }
        return false;
    };
    const drawMap = (i, j) => {
        if (!checkArr(i, j)) {
            return;
        }
        routesMap[i][j] = 1;
        routesMap[j][i] = 1;

        for (let m = 0; m < n; m++) {
            routesMap[i][m] = Math.min(routesMap[i][m], routesMap[j][m] + 1);
            routesMap[m][i] = routesMap[i][m];
            routesMap[j][m] = Math.min(routesMap[j][m], routesMap[i][m] + 1);
            routesMap[m][j] = routesMap[j][m];
        }
    };
    for (let i = 0; i < n; i++) {
        routesMap[i][i] = 0; // 顺手将Map对角线置为0

        for (let j = i + 1; j < n; j++) {
            drawMap(i, j);
        }

        // 查S和T分别有那些路线可用
        if (routes[i].indexOf(S) >= 0) sSet.add(i);
        if (routes[i].indexOf(T) >= 0) tSet.add(i);
    }

    // change表示换乘的次数
    let change = n;
    for (const i of sSet) {
        for (const j of tSet) {
            if (routesMap[i][j] < change) change = routesMap[i][j];
        }
    }

    // 换乘次数加一就是乘车的次数
    return change < n ? change + 1 : -1;
};

/* My Solution 0.1 超出时间限制。。。4607ms。。 */
/*
   这个方法思路是双向从S和T分别遍历，还是有点暴力
 */
/**
 * @param {number[][]} routes
 * @param {number} S
 * @param {number} T
 * @return {number}
 */
const numBusesToDestination = function (routes, S, T) {
    if (S === T) return 0;

    const n = routes.length;
    // 记录S和T分别有哪些路线可乘坐
    const sSet = new Set();
    const tSet = new Set();
    for (let m = 0; m < n; m++) {
        if (routes[m].indexOf(S) >= 0) sSet.add(m);
        if (routes[m].indexOf(T) >= 0) tSet.add(m);
    }

    const checkArr = (i, j) => {
        // 检查两路线是否相交（可以换乘）
        for (const r of routes[i]) {
            if (routes[j].indexOf(r) >= 0) {
                return true;
            }
        }
        return false;
    };
    const checkSet = (a, b) => {
        // 检查两集合是否有公共元素（路线）
        for (const r of a) {
            if (b.has(r)) {
                return true;
            }
        }
        return false;
    };
    const takeBus = (from_set, source_set) => {
        const to_set = new Set();
        // 遍历路线，来匹配可换乘的公交路线
        for (let m = 0; m < n; m++) {
            if (source_set.has(m)) continue;
            for (const f of from_set) {
                if (checkArr(m, f)) {
                    // 匹配成功，当前路线可换乘
                    to_set.add(m);
                    sSet.add(m);
                    break;
                }
            }
        }
        return to_set;
    };

    let fromSet = new Set(sSet); let toSet = new Set(tSet); // 当前可乘坐的新路线
    if (checkSet(fromSet, toSet)) return 1;
    let count = 1;

    while (1) {
        // 先从S深入一步
        fromSet = takeBus(fromSet, sSet);
        if (fromSet.size === 0) break;
        count++;
        if (checkSet(fromSet, toSet)) return count;

        // 再从T走一步
        toSet = takeBus(toSet, tSet);
        if (toSet.size === 0) break;
        count++;
        if (checkSet(fromSet, toSet)) return count;
    }
    return -1;
};
const numBusesToDestination01 = function (routes, S, T) {
    if (S === T) return 0;

    const routeSet = new Set(routes);
    const sSet = new Set(); const tSet = new Set();
    sSet.add(S);
    tSet.add(T);
    let sArr = [S]; let tArr = [T];
    let count = 0;

    const takeBus = (fromArr, fromSet) => {
        const toArr = [];
        // 遍历路线和当前可到达地点，来匹配可乘坐的公交路线
        for (const route of routeSet) {
            for (const f of fromArr) {
                if (route.indexOf(f) >= 0) {
                    // 匹配成功，当前路线可乘坐
                    for (const to of route) {
                        if (!fromSet.has(to)) {
                            fromSet.add(to);
                            toArr.push(to);
                        }
                    }
                    routeSet.delete(route);
                    break;
                }
            }
        }
        return toArr;
    };

    while (1) {
        // 先从S深入一步
        sArr = takeBus(sArr, sSet);
        if (sArr.length === 0) break;
        count++;
        for (const s of sArr) {
            if (tArr.indexOf(s) >= 0) return count;
        }

        // 再从T走一步
        tArr = takeBus(tArr, tSet);
        if (tArr.length === 0) break;
        count++;
        for (const t of tArr) {
            if (sArr.indexOf(t) >= 0) return count;
        }
    }
    return -1;
};

/* My Solution 0.0 超出时间限制。。。 */
/*
   绘制全图，没想到有时间限制
 */
const numBusesToDestination00 = function (routes, S, T) {
    if (S === T) return 0;

    const busMap = {};
    const busDrawed = new Set();

    const drawMap = (a, b) => {
        if (busMap[a] && busMap[a][b] === 1) {
            // 说明已经直接连接过这两个站点，不需要重复连接
            return;
        }

        if (!busMap[a]) busMap[a] = {};
        if (!busMap[b]) busMap[b] = {};
        busMap[b][a] = 1;
        busMap[a][b] = 1;

        // 分支连接
        for (const k of Object.keys(busMap[a])) {
            busMap[b][k] = Math.min(busMap[b][k] || Infinity, busMap[a][k] + 1);
            busMap[k][b] = busMap[b][k];
        }
        for (const k of Object.keys(busMap[b])) {
            busMap[a][k] = Math.min(busMap[a][k] || Infinity, busMap[b][k] + 1);
            busMap[k][a] = busMap[a][k];
        }
    };

    for (const route of routes) {
        for (let i = 0; i < route.length; i++) {
            for (let j = i + 1; j < route.length; j++) {
                drawMap(route[i], route[j]);
            }
        }
    }

    return busMap[S][T] || -1;
};
