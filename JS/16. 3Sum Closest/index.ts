function threeSumClosest(nums: number[], target: number): number {
    nums.sort((a, b) => a - b);
    const n: number = nums.length;
    let upperGap = 100000, lowerGap = 100000;
    let l = 0;
    for (; l + 2 < n; l++) {
        const subTarget = target - nums[l];
        let m = l + 1, r = n - 1;
        while (true) {
            const curGap = subTarget - nums[m] - nums[r];
            if (curGap > 0) { // less than target
                lowerGap = Math.min(lowerGap, curGap);
                if (m < r - 1) {
                    m++;
                }
                else {
                    break;
                }
            }
            else if (curGap < 0) { // larger than target
                upperGap = Math.min(upperGap, -curGap);
                if (r > m + 1) {
                    r--;
                }
                else {
                    break;
                }
            }
            else if (curGap === 0) {
                return target;
            }
        }
    }
    if (upperGap <= lowerGap) {
        return target + upperGap;
    }
    return target - lowerGap;
};
