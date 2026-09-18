function productExceptSelf(nums: number[]): number[] {
    const leftProductArr = nums.map(() => 1);
    const rightProductArr = nums.map(() => 1);

    for (let i = 1; i < nums.length; i++) {
        leftProductArr[i] = leftProductArr[i - 1] * nums[i - 1];
        rightProductArr[nums.length - 1 - i] = rightProductArr[nums.length - i] * nums[nums.length - i];
    }

    return leftProductArr.map((v, i) => v * rightProductArr[i]);

    // optimal solution: O(1) space complexity
    // const res = nums.map(() => 1);
    // let leftProduct = 1;
    // let rightProduct = 1;

    // for (let i = 0; i < nums.length; i++) {
    //     res[i] *= leftProduct;
    //     leftProduct *= nums[i];

    //     res[nums.length - 1 - i] *= rightProduct;
    //     rightProduct *= nums[nums.length - 1 - i];
    // }

    // return res;
};
