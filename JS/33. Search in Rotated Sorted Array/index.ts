
// [4, 5, 6, 7, 8, -2, -1, 0, 1, 2][4, 5, 6, 7, 8, -2, -1, 0, 1, 2]
function search(nums: number[], target: number): number {
    const n = nums.length;
    let l = 0;
    let r = n - 1;
    let mid = Math.floor((l + r) / 2);

    while (l <= r) {
        if (nums[mid] === target) {
            return mid;
        }
        if (nums[mid] > nums[l]) {
            if (nums[l] === target) {
                return l;
            }
            if (nums[mid] > target && nums[l] < target) {
                r = mid - 1;
            }
            else {
                l = mid + 1;
            }
        }
        else {
            if (nums[r] === target) {
                return r;
            }
            if (nums[mid] < target && nums[r] > target) {
                l = mid + 1;
            }
            else {
                r = mid - 1;
            }
        }
        mid = Math.floor((l + r) / 2);
    }
    return -1;
};
