function minimumSteps(s: string): number {
    const n = s.length;
    const ballCounts: Array<[number, number]> = [];

    let swappedTimes = 0;
    let toSwapRight = 0;
    for (let i = 0; i < n; i++) {
        if (s[i] === '0') {
            swappedTimes += toSwapRight;
        }
        else {
            toSwapRight++;
        }
    }

    return swappedTimes;
};
