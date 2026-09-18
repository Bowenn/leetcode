function longestOnes(nums: number[], k: number): number {
    let res = 0;
    let l = 0;
    let r = 0;
    let kLeft = k;
    while (true) {
        while (true) {
            if (nums[r] === 0) {
                if (kLeft === 0) {
                    break;
                }
                kLeft--;
            }
            r++;
            if (r >= nums.length) {
                res = Math.max(res, r - l);
                return res;
            }
        }
        res = Math.max(res, r - l);
        while (true) {
            if (nums[l] === 0) {
                l++;
                kLeft++;
                break;
            }
            l++;
        }
    }
};
