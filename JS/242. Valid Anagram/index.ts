function isAnagram(s: string, t: string): boolean {
    if (s.length !== t.length) {
        return false;
    }

    const BASE_CODE = 'a'.charCodeAt(0);

    const charMap: number[] = new Array(26).fill(0); // <char, count>

    for (let i = 0; i < s.length; i++) {
        charMap[s.charCodeAt(i) - BASE_CODE]++;
    }

    for (let i = 0; i < t.length; i++) {
        charMap[t.charCodeAt(i) - BASE_CODE]--;
        if (charMap[t.charCodeAt(i) - BASE_CODE] < 0) {
            return false;
        }
    }

    return true;
};
