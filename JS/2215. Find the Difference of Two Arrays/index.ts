function findDifference(nums1: number[], nums2: number[]): number[][] {
    const nums1Set = new Set(nums1);
    const nums2Set = new Set(nums2);

    const res: number[][] = [[]];

    for (const n of nums1Set) {
        if (nums2Set.has(n)) {
            nums2Set.delete(n);
        }
        else {
            res[0].push(n);
        }
    }

    res.push([...nums2Set]);

    return res;
};
