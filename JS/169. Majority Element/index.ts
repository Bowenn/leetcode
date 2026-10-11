function majorityElement(nums: number[]): number {
    let temp = nums[0];
    let count = 1;
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] === temp) {
            count++;
        }
        else {
            if (count > 0) {
                count--;
            }
            else {
                temp = nums[i];
                count = 1;
            }
        }
    }

    return temp;
};
