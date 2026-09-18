
// sort based on the end time of each interval is not easy to come up with, so I prefer the other solution
function eraseOverlapIntervals(intervals: number[][]): number {
    const n = intervals.length;
    intervals.sort((a, b) => a[1] - b[1]);

    let res = 0;
    let endTime = -Infinity;
    for (let i = 0; i < n; i++) {
        if (intervals[i][0] >= endTime) {
            endTime = intervals[i][1];
        }
        else {
            res++;
        }
    }
    return res;
};

function eraseOverlapIntervals2(intervals: number[][]): number {
    const n = intervals.length;
    intervals.sort((a, b) => a[0] - b[0]);

    let res = 0;
    let endTime = intervals[0][1];
    for (let i = 1; i < n; i++) {
        if (intervals[i][0] < endTime) {
            res++;
            endTime = Math.min(endTime, intervals[i][1]); // keep the smaller end time to avoid overlapping with the next interval
        }
        else {
            endTime = intervals[i][1];
        }
    }
    return res;
};
