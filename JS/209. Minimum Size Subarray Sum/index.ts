// normal two pointer. O(n) O(n)
function minSubArrayLen(target: number, nums: number[]): number {
    const prefixSum = Array(nums.length + 1).fill(0);
    for (let i = 1; i < prefixSum.length; i++) {
        prefixSum[i] = prefixSum[i - 1] + nums[i - 1];
    }

    let l = 0;
    let r = 1;
    let result = Infinity;
    while (r < prefixSum.length) {
        if (prefixSum[r] - prefixSum[l] >= target) {
            result = Math.min(r - l, result);
            l++;
        }
        else {
            r++;
        }
    }
    return Number.isFinite(result) ? result : 0;
};

// guess and check through binary search. O(nlogn) O(n)
function minSubArrayLen2(target: number, nums: number[]): number {
    const prefixSum = Array(nums.length + 1).fill(0);
    for (let i = 1; i < prefixSum.length; i++) {
        prefixSum[i] = prefixSum[i - 1] + nums[i - 1];
    }

    let upperCase = nums.length;
    let lowerCase = 1;
    const check = (l: number) => {
        for (let i = 0; i + l < prefixSum.length; i++) {
            if (prefixSum[i + l] - prefixSum[i] >= target) {
                return true;
            }
        }
        return false;
    };

    let result = 0;
    while (lowerCase < upperCase) {
        const mid = Math.floor((upperCase + lowerCase) / 2);
        if (check(mid)) {
            result = mid;
            upperCase = mid - 1;
        }
        else {
            lowerCase = mid + 1;
        }
    }
    if ((result === 0 || lowerCase < result) && check(lowerCase)) {
        // result = lowerCase;
        return lowerCase;
    }
    return result;
};
