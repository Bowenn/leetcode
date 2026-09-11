function closeStrings(word1: string, word2: string): boolean {
    if (word1.length !== word2.length) {
        return false;
    }

    // optional optimization: use char code as key to avoid the overhead of string hashing and save time
    const charCounts1: Record<string, number> = word1.split('').reduce((res, curChar) => {
        if (!(curChar in res)) {
            res[curChar] = 0;
        }
        res[curChar]++;
        return res;
    }, {} as Record<string, number>);

    const charSet1 = new Set(Object.keys(charCounts1));
    const countsArr1 = Object.values(charCounts1);
    countsArr1.sort((a, b) => (a - b));

    const charCounts2: Record<string, number> = word2.split('').reduce((res, curChar) => {
        if (!(curChar in res)) {
            res[curChar] = 0;
        }
        res[curChar]++;
        return res;
    }, {} as Record<string, number>);

    const charSet2 = new Set(Object.keys(charCounts2));
    const countsArr2 = Object.values(charCounts2);
    countsArr2.sort((a, b) => (a - b));

    if (charSet1.size !== charSet2.size
        || countsArr1.length !== countsArr2.length) {
        return false;
    }

    for (const char of charSet1) {
        if (!charSet2.has(char)) {
            return false;
        }
        charSet2.delete(char);
    }

    for (let i = 0; i < countsArr1.length; i++) {
        if (countsArr1[i] !== countsArr2[i]) {
            return false;
        }
    }

    return true;
};
