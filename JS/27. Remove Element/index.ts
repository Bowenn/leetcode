function removeElement(nums: number[], val: number): number {
    let l = 0;
    let r = nums.length - 1;
    
    while (l < r) {
        while (l < r && nums[l] !== val) {
            l++;
        }
        while (r > l && nums[r] === val) {
            r--;
        }
        if (l < r) {
            const temp = nums[l];
            nums[l] = nums[r];
            nums[r] = temp;
        }
    }

    return nums[l] === val ? l : l + 1;
};
