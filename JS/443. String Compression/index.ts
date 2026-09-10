function compress(chars: string[]): number {
    let res = 0;
    let char = chars[0];
    let repeatN = 1;
    for (let i = 1; i < chars.length; i++) {
        if (chars[i] === char) {
            repeatN++;
        }
        else {
            if (repeatN === 1) {
                chars[res] = char;
                res += 1;
            }
            else {
                const toReplace = [char].concat(repeatN.toString().split(''));
                for (let i = 0; i < toReplace.length; i++) {
                    chars[res + i] = toReplace[i];
                }
                res += toReplace.length;
            }
            char = chars[i];
            repeatN = 1;
        }
    }

    if (repeatN === 1) {
        chars[res] = char;
        res += 1;
    }
    else {
        const toReplace = [char].concat(repeatN.toString().split(''));
        for (let i = 0; i < toReplace.length; i++) {
            chars[res + i] = toReplace[i];
        }
        res += toReplace.length;
    }

    return res;
};
