/**
 Do not return anything, modify nums in-place instead.
 */

// Counting sort approach
function sortColors(nums: number[]): void {
    let redCount = 0;
    let whiteCount = 0;
    let blueCount = 0;

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === 2) {
            blueCount++;
        }
        else if (nums[i] === 1) {
            nums[redCount + whiteCount] = 1;
            nums[i] = blueCount > 0 ? 2 : 1;
            whiteCount++;
        }
        else if (nums[i] === 0) {
            nums[redCount + whiteCount] = 1;
            nums[i] = blueCount > 0 ? 2 : 1;
            nums[redCount] = 0;
            redCount++;
        }
    }
};

// Two-pointer approach
function sortColors2(nums: number[]): void {
    let l = 0;
    let r = nums.length - 1;
    // red first
    while (l < r) {
        while (l < r && nums[l] === 0) {
            l++;
        }
        while (l < r && nums[r] !== 0) {
            r--;
        }
        if (l >= r) {
            break;
        }
        nums[r] = nums[l];
        nums[l] = 0;
        l++;
        r--;
    }

    // then white and blue
    nums[l] === 0 && l++;
    r = nums.length - 1;
    while (l < r) {
        while (l < r && nums[l] === 1) {
            l++;
        }
        while (l < r && nums[r] !== 1) {
            r--;
        }
        if (l >= r) {
            break;
        }
        nums[r] = 2;
        nums[l] = 1;
        l++;
        r--;
    }
};
