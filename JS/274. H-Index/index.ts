// time O(n) space O(n)
function hIndex(citations: number[]): number {
    const counts = Array(citations.length + 1).fill(0);
    for (let i = 0; i < citations.length; i++) {
        counts[Math.min(citations.length, citations[i])]++;
    }

    // console.log(counts);

    let temp = 0;
    for (let i = counts.length - 1; i >= 0; i--) {
        temp += counts[i];
        if (temp >= i) {
            return i;
        }
    }
    return 0;
};

// time O(n log n) space O(1)
function hIndex2(citations: number[]): number {
    citations.sort((a, b) => a - b);
    let h = 0;
    for (; citations.length - 1 - h >= 0; h++) {
        if (citations[citations.length - 1 - h] < h + 1) {
            return h;
        }
    }
    return h;
};
