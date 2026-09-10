function increasingTriplet(nums: number[]): boolean {
    let tempNumI = nums[0];
    let minNumK = Infinity;

    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > minNumK) {
            return true;
        }
        else if (nums[i] > tempNumI) {
            minNumK = Math.min(minNumK, nums[i]);
        }
        else if (nums[i] < tempNumI) {
            tempNumI = nums[i];
        }
    }

    return false;
};
