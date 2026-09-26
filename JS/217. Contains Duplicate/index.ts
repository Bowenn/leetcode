function containsDuplicate(nums: number[]): boolean {
    const s = new Set<number>();

    for (let i = 0; i < nums.length; i++) {
        if (s.has(nums[i])) {
            return true;
        }
        s.add(nums[i]);
    }

    return false;
};
