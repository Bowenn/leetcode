function isSubsequence(s: string, t: string): boolean {
    if (s.length > t.length) {
        return false;
    }

    let sp = 0;
    let tp = 0;

    while (sp < s.length) {
        while (true) {
            if (tp >= t.length) {
                return false;
            }
            if (s[sp] === t[tp]) {
                break;
            }
            tp++;
        }
        sp++;
        tp++;
    }

    return true;
};
