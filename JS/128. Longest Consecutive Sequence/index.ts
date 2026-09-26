
// tricky
function longestConsecutive(nums: number[]): number {
    if (!nums.length) {
        return 0;
    }
    
    const s = new Set<number>(nums);
    let res = 1;

    s.forEach(n => {
        if (s.has(n - 1)) {
            return;
        }
        // current n is a head of sequence
        let t = 1;
        while (s.has(n + t)) {
            t++;
        }
        res = Math.max(res, t);
    });

    return res;
};

// interval merge, union find, hash table
function longestConsecutive2(nums: number[]): number {
    if (!nums.length) {
        return 0;
    }
    const numStartMap = new Map<number, [number, number]>(); // <start, [start, end]>
    const numEndMap = new Map<number, [number, number]>(); // <end, [start, end]>

    const sSet = new Set<number>();
    let res = 1;

    for (let i = 0; i < nums.length; i++) {
        if (sSet.has(nums[i])) {
            continue;
        }
        else {
            sSet.add(nums[i]);
        }

        const item1 = numStartMap.get(nums[i] + 1);
        const item2 = numEndMap.get(nums[i] - 1);
        if (item1 && item2) {
            numStartMap.delete(item1[0]);
            numStartMap.delete(item2[0]);
            numEndMap.delete(item1[1]);
            numEndMap.delete(item2[1]);
            item1[0] = item2[0];
            numStartMap.set(item1[0], item1);
            numEndMap.set(item1[1], item1);
            res = Math.max(res, item1[1] - item1[0] + 1);
        }
        else if (item1) {
            numStartMap.delete(item1[0]);
            numEndMap.delete(item1[1]);
            item1[0]--;
            numStartMap.set(item1[0], item1);
            numEndMap.set(item1[1], item1);
            res = Math.max(res, item1[1] - item1[0] + 1);
        }
        else if (item2) {
            numStartMap.delete(item2[0]);
            numEndMap.delete(item2[1]);
            item2[1]++;
            numStartMap.set(item2[0], item2);
            numEndMap.set(item2[1], item2);
            res = Math.max(res, item2[1] - item2[0] + 1);
        }
        else {
            numStartMap.set(nums[i], [nums[i], nums[i]]);
            numEndMap.set(nums[i], [nums[i], nums[i]]);
        }
    }

    return res;
};
