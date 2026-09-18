function longestSubarray(nums: number[]): number {
    let res = 0;
    let l = 0;
    let r = 0;
    let kLeft = 1;
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
                res = Math.max(res, r - l - 1);
                return res;
            }
        }
        res = Math.max(res, r - l - 1);
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
