// O(n) time | O(n) space
function maxOperations(nums: number[], k: number): number {
    const targetMap: Map<number, number> = new Map();
    let res = 0;

    for (let i = 0; i < nums.length; i++) {
        if (targetMap.get(nums[i]) && targetMap.get(nums[i])! > 0) {
            res++;
            targetMap.set(nums[i], targetMap.get(nums[i])! - 1);
        }
        else {
            targetMap.set(k - nums[i], (targetMap.get(k - nums[i]) || 0) + 1);
        }
    }

    return res;
};

// O(nlogn) time | O(1) space
function maxOperations2(nums: number[], k: number): number {
    nums.sort((a, b) => a - b);
    let l = 0;
    let r = nums.length - 1;
    let res = 0;

    while (l < r) {
        if (nums[l] + nums[r] < k) {
            l++;
        }
        else if (nums[l] + nums[r] > k) {
            r--;
        }
        else {
            res++;
            l++;
            r--;
        }
    }

    return res;
};
