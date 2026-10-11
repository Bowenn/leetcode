function removeDuplicates(nums: number[]): number {
    let k = 2;
    for (let i = 2; i < nums.length; i++) {
        if (nums[i] > nums[k - 2]) {
            if (k < i) {
                const temp = nums[k];
                nums[k] = nums[i];
                nums[i] = temp;
            }
            k++;
        }
    }

    return k;
};
