function canJump(nums: number[]): boolean {
    let furthestIndex = nums[0];
    let curIndex = 0;

    while (curIndex <= furthestIndex && curIndex < nums.length) {
        furthestIndex = Math.max(furthestIndex, curIndex + nums[curIndex]);
        curIndex++;
    }

    return curIndex === nums.length;
};
