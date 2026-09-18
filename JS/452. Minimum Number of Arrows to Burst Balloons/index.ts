function findMinArrowShots(points: number[][]): number {
    points.sort((a, b) => a[0] - b[0]);
    const n = points.length;

    let res = 1;
    let curShotPosition = points[0][1];

    for (let i = 0; i < n; i++) {
        if (curShotPosition >= points[i][0]) {
            curShotPosition = Math.min(curShotPosition, points[i][1]);
        }
        else {
            res++;
            curShotPosition = points[i][1];
        }
    }

    return res;
};
