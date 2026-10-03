
// normal O(m*n) solution, m = haystack.length, n = needle.length
function strStr1(haystack: string, needle: string): number {
    for (let i = 0; i + needle.length <= haystack.length; i++) {
        if (haystack.substring(i, i + needle.length) === needle) {
            return i;
        }
    }
    return -1;
};

// basic O(m*n) solution, m = haystack.length, n = needle.length
function strStr2(haystack: string, needle: string): number {
    const searching: number[][] = []; // [needleIndex, startIndex]
    for (let i = 0; i < haystack.length; i++) {
        const char = haystack[i];
        for (let j = 0; j < searching.length; j++) {
            if (searching[j][0] > 0 && char === needle[searching[j][0]]) {
                searching[j][0]++;
                if (searching[j][0] === needle.length) {
                    return searching[j][1];
                }
            }
            else {
                searching[j][0] = -1;
            }
        }
        if (char === needle[0]) {
            if (needle.length === 1) {
                return i;
            }
            searching.push([1, i]);
        }
    }
    return -1;
};
