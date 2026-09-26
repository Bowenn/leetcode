function characterReplacement(s: string, k: number): number {
    const BASE_CHAR_CODE = 'A'.charCodeAt(0);
    let l = 0;
    let r = 1;
    let kLeft = k;
    const charCounts = Array(26).fill(0);
    let maxCountCharCode = s.charCodeAt(0) - BASE_CHAR_CODE;
    charCounts[maxCountCharCode] = 1;

    const findMaxCountCharCode = (): number => {
        let res = 0;
        let temp = charCounts[0];
        for (let i = 1; i < 26; i++) {
            if (charCounts[i] > temp) {
                temp = charCounts[i];
                res = i;
            }
        }
        return res;
    };

    let result = 1;

    while (r < s.length) {
        const charCode = s.charCodeAt(r) - BASE_CHAR_CODE;
        charCounts[charCode]++;
        if (charCode === maxCountCharCode) {
            // console.log(l, r, kLeft);
            r++;
            continue;
        }
        else {
            kLeft--;
            if (charCounts[charCode] > charCounts[maxCountCharCode]) {
                maxCountCharCode = charCode;
                kLeft++;
            }

            if (kLeft >= 0) {
                // console.log(l, r, kLeft);
                r++;
                continue;
            }
            else { // kLeft === -1, need to move left pointer
                // calc max length before move
                result = Math.max(result, r - l);

                while (true) {
                    const charCodeToRemove = s.charCodeAt(l) - BASE_CHAR_CODE;
                    l++;
                    charCounts[charCodeToRemove]--;
                    if (charCodeToRemove !== maxCountCharCode) {
                        // remove and continue
                        kLeft++;
                        break;
                    }
                    else {
                        const newMaxCountCharCode = findMaxCountCharCode();
                        if (newMaxCountCharCode === maxCountCharCode || charCounts[newMaxCountCharCode] === charCounts[maxCountCharCode]) {
                            // need move left pointer further
                            continue;
                        }
                        else {
                            maxCountCharCode = newMaxCountCharCode;
                            kLeft++;
                            break;
                        }
                    }
                }
            }
        }
        // console.log(l, r, kLeft);
        r++;
    }

    // console.log(l, r, kLeft);
    result = Math.max(result, r - l);

    return result;
};
