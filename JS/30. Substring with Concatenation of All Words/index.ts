function findSubstring(s: string, words: string[]): number[] {
    const n = s.length;
    const m = words[0].length;
    const wordsMap = new Map<string, number>(); // <word, count>
    const result = [];

    for (let i = 0; i < words.length; i++) {
        wordsMap.set(words[i], (wordsMap.get(words[i]) ?? 0) + 1);
    }

    for (let offset = 0; offset < m; offset++) {
        let l = offset;
        let r = offset;
        let toMatch = new Map([...wordsMap]);
        
        while (r < n) {
            const nextWord = s.substring(r, r + m);
            const searchRes = toMatch.get(nextWord);
            // console.log(nextWord, searchRes);
            if (searchRes) {
                if (searchRes === 1) {
                    toMatch.delete(nextWord);
                    if (toMatch.size === 0) { // all match
                        result.push(l);

                        // one more step: move l, for next match
                        toMatch.set(s.substring(l, l + m), 1);
                        l += m;
                    }
                }
                else {
                    toMatch.set(nextWord, searchRes - 1);
                }
                r += m;
            }
            else if (wordsMap.has(nextWord)) {
                // over matched, move l until another word is popped
                while (true) {
                    const toPop = s.substring(l, l + m);
                    if (toPop === nextWord) {
                        l += m;
                        break;
                    }
                    else {
                        toMatch.set(toPop, (toMatch.get(toPop) ?? 0) + 1);
                        l += m;
                    }
                }
                r += m;
                // console.log(l, r, toMatch)
            }
            else {
                // unknown word, reset
                r += m;
                l = r;
                toMatch = new Map([...wordsMap]);
            }
        }
    }

    return result;
};
