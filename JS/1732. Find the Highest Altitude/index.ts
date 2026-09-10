function largestAltitude(gain: number[]): number {
    let res = 0;
    let temp = 0;
    for (let i = 0; i < gain.length; i++) {
        temp += gain[i];
        res = Math.max(res, temp);
    }
    return res;
};
