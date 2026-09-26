function lengthOfLongestSubstring(s: string): number {
    const m = new Map<string, number>(); // <character, lastIndex>
    let res = 0;

    let headIndex = 0;
    for (let i = 0; i < s.length; i++) {
        if (m.has(s[i]) && m.get(s[i])! >= headIndex) {
            res = Math.max(res, i - headIndex);
            headIndex = m.get(s[i])! + 1;
        }
        m.set(s[i], i);
    }

    res = Math.max(res, s.length - headIndex);

    return res;
};
