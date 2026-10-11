function fourSum(nums: number[], target: number): number[][] {
    nums.sort((a, b) => a - b);
    const res: number[][] = [];

    let i = 0;

    while (i < nums.length) {
        let j = i + 1;
        while (j < nums.length) {
            let l = j + 1;
            let r = nums.length - 1;
            const subTarget = target - nums[i] - nums[j];
            while (l < r) {
                if (nums[l] + nums[r] === subTarget) {
                    res.push([nums[i], nums[j], nums[l], nums[r]]);
                    l++;
                    while (l < r && nums[l] === nums[l - 1]) {
                        l++;
                    }
                    r--;
                    while (r > l && nums[r] === nums[r + 1]) {
                        r--;
                    }
                }
                else if (nums[l] + nums[r] < subTarget) {
                    l++;
                }
                else {
                    r--;
                }
            }
            j++;
            while (j < nums.length && nums[j] === nums[j - 1]) {
                j++;
            }
        }
        i++;
        while (i < nums.length && nums[i] === nums[i - 1]) {
            i++;
        }
    }
    return res;
};
