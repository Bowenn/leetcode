function findMaxAverage(nums: number[], k: number): number {
    let tempSum = 0;
    for (let i = 0; i < k; i++) {
        tempSum += nums[i];
    }

    let maxSum = tempSum;

    for (let i = k; i < nums.length; i++) {
        tempSum = tempSum - nums[i - k] + nums[i];
        maxSum = Math.max(maxSum, tempSum);
    }

    return maxSum / k;
};
