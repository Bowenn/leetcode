function maxVowels(s: string, k: number): number {
    const vowelDict = new Set('aeiou');
    let count = 0;
    // initial window
    for (let i = 0; i < k; i++) {
        if (vowelDict.has(s[i])) {
            count++;
        }
    }

    let res = count;

    // slide window
    for (let i = k; i < s.length; i++) {
        if (vowelDict.has(s[i - k])) {
            count--;
        }
        if (vowelDict.has(s[i])) {
            count++;
            res = Math.max(res, count);
        }
    }

    return res;
};
