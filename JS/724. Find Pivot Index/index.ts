
// suprisingly, maintaining a hashmap is slower than iterating the array twice, but it is more elegant
function pivotIndex(nums: number[]): number {
    const targetMap = new Map();
    let total = 0;
    for (let i = 0; i < nums.length; i++) {
        const expectedTotal = total * 2 + nums[i];
        if (!targetMap.has(expectedTotal)) {
            targetMap.set(expectedTotal, i);
        }
        total += nums[i];
    }

    return targetMap.get(total) ?? -1;
};
