
// O(n^2) time complexity, O(n) space complexity
function maxFrequency(nums: number[], k: number): number {
    nums.sort((a, b) => a - b);
    const numSums = nums.reduce((res, cur) => {
        res.push(res[res.length - 1] + cur);
        return res;
    }, [0]);

    // console.log(nums, numSums);

    let res = 1;
    let tempFreq = 1;
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] === nums[i - 1]) {
            tempFreq++;
        }
        else {
            res = Math.max(res, tempFreq);
            tempFreq = 1;
            
            let j = 1;
            while (i - j >= 0 && numSums[i - j] + j * nums[i] <= numSums[i] + k) {
                j++;
            }

            tempFreq += j - 1;
        }
    }

    res = Math.max(res, tempFreq);
    return res;
};

// O(n log n) time complexity, O(n) space complexity
// calc temp sum to lower the space complexity to O(1)
function maxFrequency2(nums: number[], k: number): number {
    nums.sort((a, b) => a - b);

    const numSums = nums.reduce((res, cur) => {
        res.push(res[res.length - 1] + cur);
        return res;
    }, [0]);

    // console.log(nums, numSums);

    let res = 1;
    let l = 0;
    let r = 1;

    while (true) {
        while (r < nums.length && numSums[r] - numSums[l] + k >= nums[r] * (r - l)) {
            r++;
        }
        res = Math.max(res, r - l);
        if (r >= nums.length) {
            break;
        }
        while (numSums[r] - numSums[l] + k < nums[r] * (r - l)) {
            l++;
        }
    }

    return res;
};
