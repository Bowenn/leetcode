function rob(nums: number[]): number {
    if (nums.length < 2) {
        return nums[0];
    }
    const tempMoney = [[nums[0], 0], [nums[1], nums[0]]]; // [[max money rob cur house, max money not rob cur house]...]

    for (let i = 2; i < nums.length; i++) {
        tempMoney.push([
            tempMoney[tempMoney.length - 1][1] + nums[i],
            Math.max(
                tempMoney[tempMoney.length - 1][1],
                tempMoney[tempMoney.length - 1][0]
            )
        ]);
    }

    return Math.max(tempMoney[tempMoney.length - 1][1], tempMoney[tempMoney.length - 1][0]);
};
