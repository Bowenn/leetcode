function findPeakElement(nums: number[]): number {
    let left = 0;
    let right = nums.length - 1;

    while (true) {
        if (left >= right - 1) {
            return nums[left] > nums[right] ? left : right;
        }
        const mid = Math.floor((left + right) / 2);
        const midLeft = nums[mid - 1] < nums[mid];
        const midRight = nums[mid + 1] < nums[mid];
        const edgeLeft = nums[left] < nums[right];
        if (midLeft && midRight) {
            return mid;
        }
        else {
            if (midLeft) {
                left = mid;
            }
            else {
                right = mid;
            }
        }
    }
};
