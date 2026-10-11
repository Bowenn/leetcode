function threeSum(nums: number[]): number[][] {
    nums.sort((a, b) => a - b);

    const res: number[][] = [];

    let i = 0;
    while (i < nums.length) {
        let l = i + 1;
        let r = nums.length - 1;
        const target = -nums[i];

        while (l < r) {
            if (nums[l] + nums[r] === target) {
                res.push([nums[i], nums[l], nums[r]]);
                l++;
                while (nums[l] === nums[l - 1] && l < r) {
                    l++;
                }
                r--;
                while (nums[r] === nums[r + 1] && r > l) {
                    r--;
                }
            }
            else if (nums[l] + nums[r] < target) {
                l++;
            }
            else {
                r--;
            }
        }

        i++;
        while (nums[i] === nums[i - 1] && i < nums.length) {
            i++;
        }
    }

    return res;
};
