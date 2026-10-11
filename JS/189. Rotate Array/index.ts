/**
 Do not return anything, modify nums in-place instead.
 */
// time complexity: O(n), space complexity: O(1)
function rotate(nums: number[], k: number): void {
    const n = nums.length;
    k = k % n;
    for (let i = 0; i * 2 < n; i++) {
        const temp = nums[i];
        nums[i] = nums[n - 1 - i];
        nums[n - 1 - i] = temp;
    }

    for (let i = 0; i * 2 < k; i++) {
        const temp = nums[i];
        nums[i] = nums[k - 1 - i];
        nums[k - 1 - i] = temp;
    }

    for (let i = 0; k + i * 2 < n; i++) {
        const temp = nums[k + i];
        nums[k + i] = nums[n - 1 - i];
        nums[n - 1 - i] = temp;
    }
};


// time complexity: O(n), space complexity: O(k)
function rotate2(nums: number[], k: number): void {
    const n = nums.length;
    k = k % n;
    const kTemp = nums.slice(n - k, n);

    for (let i = n - 1; i - k >= 0; i--) {
        nums[i] = nums[i - k];
    }
    for (let i = 0; i  < k; i++) {
        nums[i] = kTemp[i];
    }
};
