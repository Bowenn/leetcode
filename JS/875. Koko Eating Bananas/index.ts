function minEatingSpeed(piles: number[], h: number): number {
    let upperEdge = Math.max(...piles);
    let lowerEdge = 1;

    while (lowerEdge < upperEdge) {
        const k = Math.floor((lowerEdge + upperEdge) / 2);
        const hNeeded = piles.reduce((res, cur) => {
            res += Math.ceil(cur / k);
            return res;
        }, 0);
        if (hNeeded <= h) {
            upperEdge = k;
        }
        else {
            lowerEdge = k + 1;
        }
    }
    return lowerEdge;
};
