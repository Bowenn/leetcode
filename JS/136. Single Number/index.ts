function singleNumber(nums: number[]): number {
    return nums.reduce((res, cur) => res ^ cur, 0);
};
