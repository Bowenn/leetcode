function twoSum(nums: number[], target: number): number[] {
    const m = new Map<number, number>(); // <target gap, index>

    for (let i = 0; i < nums.length; i++) {
        if (m.has(nums[i])) {
            return [m.get(nums[i])!, i];
        }
        m.set(target - nums[i], i);
    }
    throw new Error('No two sum solution');
};
