/**
 Do not return anything, modify nums in-place instead.
 */
function moveZeroes(nums: number[]): void {
    let offset = 0;
    let i = 0;
    while (i < nums.length) {
        if (nums[i] === 0) {
            offset++;
        }
        else {
            if (offset > 0) {
                nums[i - offset] = nums[i];
                nums[i] = 0;
            }
        }
        i++;
    }
};
