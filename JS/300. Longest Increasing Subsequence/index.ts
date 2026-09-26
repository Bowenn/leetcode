function lengthOfLIS(nums: number[]): number {
    const res: number[] = [nums[0]]; // res[i]: min num that subsequence of length i end with 
    for (let i = 1; i < nums.length; i++) {
        let j = 0;
        for (; j < res.length; j++) {
            if (nums[i] <= res[j]) {
                res[j] = nums[i];
                break;
            }
        }
        if (j === res.length) {
            res.push(nums[i]);
        }
    }

    return res.length;
};
