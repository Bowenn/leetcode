
// so many edges, but the final solution is still O(n) time O(1) space
function candy(ratings: number[]): number {
    let res = 0;
    let l = 0;
    let r = 1;
    let lastMinCandy = 0;

    while (l < ratings.length) {
        while (
            r < ratings.length
            && ratings[r - 1] > ratings[r]
        ) {
            r++;
        }
        const childrenCounts = r - l;
        if (childrenCounts === 1) {
            res += 1;
            if (l > 0 && ratings[l] > ratings[l - 1]) {
                res += lastMinCandy;
                lastMinCandy++;
            }
            else {
                lastMinCandy = 1;
            }
        }
        else {
            res += (childrenCounts + 1) * childrenCounts / 2;
            if (l > 0 && ratings[l] > ratings[l - 1]) {
                res += Math.max(0, lastMinCandy + 1 - childrenCounts);
            }
            lastMinCandy = 1;
        }
        // console.log(l, r, childrenCounts, res);
        l = r;
        r++;
    }

    return res;
};
