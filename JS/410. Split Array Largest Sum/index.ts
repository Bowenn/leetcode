// dp solution, time complexity: O(n^2 * k), space complexity: O(n^2)
// space complexity can be optimized to O(n * k) by using 1D array to store numSumsMap
function splitArray(nums: number[], k: number): number {
    const n = nums.length;

    // sum of nums[l, r] is numSums[r + 1] - numSums[l]
    const numSums: number[] = nums.reduce((res, cur) => {
        res.push((res[res.length - 1] ?? 0) + cur);
        return res;
    }, [0]);
    const numSumsMap = Array.from({ length: n }, () => Array(n).fill(0));
    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            numSumsMap[i][j] = numSums[j + 1] - numSums[i];
        }
    }

    // i: 1 => k - 1, l: n - 1 => 0
    // f(nums[l, n], i) = Math.min(
    //      Math.max(f(nums[l + 1, n - 1], i - 1), numSumsMap[l][l]),
    //      Math.max(f(nums[l + 2, n - 1], i - 1), numSumsMap[l][l + 1]),
    //      ...
    //      Math.max(f(nums[l + (n - l - 1), n - 1], i - 1), numSumsMap[l][n - 2])
    // )

    const dpMap: number[][] = Array.from({ length: k }, () => Array(n).fill(0));
    // when k == 0, minMaxSum is all sum
    for (let l = n - 1; l >= 0; l--) {
        dpMap[0][l] = numSumsMap[l][n - 1];
    }

    // console.log(dpMap);
    
    for (let i = 1; i <= k - 1; i++) {
        for (let l = n - 1; l >= 0; l--) {
            let tempMin = Infinity;
            for (let j = l + 1; j <= n - 1; j++) {
                tempMin = Math.min(tempMin, Math.max(dpMap[i - 1][j], numSumsMap[l][j - 1]));
            }
            dpMap[i][l] = tempMin;
        }
        // console.log(dpMap);
    }

    return dpMap[k - 1][0];
};


// tricky solution using binary search, time complexity: O(n * log(sum(nums))), space complexity: O(1)
// the idea is to use binary search to guess a number and check it
function splitArray2(nums: number[], k: number): number {
    const n = nums.length;

    const totalSums: number = nums.reduce((res, cur) => {
        return res + cur;
    });

    let lowerEdge = nums[0];
    let upperEdge = totalSums;

    const checkRes = (res: number): boolean => {
        let kLeft = k - 1;
        let tempSum = 0;
        let i = 0;

        while (kLeft >= 0 && i < n) {
            if (tempSum + nums[i] <= res) {
                tempSum += nums[i];
                i++;
            }
            else {
                kLeft--;
                tempSum = 0;
            }
        }

        return kLeft >= 0;
    };

    while (lowerEdge < upperEdge) {
        // console.log(lowerEdge, upperEdge);
        const mid = Math.floor((lowerEdge + upperEdge) / 2);
        if (checkRes(mid)) {
            upperEdge = mid;
        }
        else {
            lowerEdge = mid + 1;
        }
    }

    return upperEdge;
};
