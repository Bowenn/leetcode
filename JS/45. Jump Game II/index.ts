function jump(nums: number[]): number {
    const n = nums.length;
    let jumpCount = 0;
    let furtheastJump = 0;
    let nextFurtheastJump = nums[0];
    let curIndex = 0;

    while (furtheastJump < n - 1) {
        while (curIndex <= furtheastJump) {
            nextFurtheastJump = Math.max(nextFurtheastJump, curIndex + nums[curIndex]);
            curIndex++;
        }
        furtheastJump = nextFurtheastJump;
        jumpCount++;
    }

    return jumpCount;
};
