/**
 Do not return anything, modify nums in-place instead.
 */
function nextPermutation(nums: number[]): void {
    let r1 = nums.length - 2;
    while (r1 >= 0 && nums[r1] >= nums[r1 + 1]) {
        r1--;
    }
    if (r1 < 0) {
        // reverse the num to get the smallest num
        for (let i = 0; i * 2 < nums.length; i++) {
            const temp = nums[i];
            nums[i] = nums[nums.length - 1 - i];
            nums[nums.length - 1 - i] = temp;
        }
        return;
    }

    let r2 = r1;
    while (r2 + 1 < nums.length && nums[r2 + 1] > nums[r1]) {
        r2++;
    }
    // console.log(r1, r2);
    const temp = nums[r1];
    nums[r1] = nums[r2];
    nums[r2] = temp;

    // reverse the num to get the smallest num
    for (let i = 0; r1 + 1 + i * 2 < nums.length; i++) {
        // console.log(r1 + 1 + i, nums.length - 1 - i);
        const temp = nums[r1 + 1 + i];
        nums[r1 + 1 + i] = nums[nums.length - 1 - i];
        nums[nums.length - 1 - i] = temp;
    }

    return;
};
