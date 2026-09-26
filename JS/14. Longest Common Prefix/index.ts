function longestCommonPrefix(strs: string[]): string {
    let res = '';
    let i = 0;
    while (true) {
        const commonChar = strs[0][i];
        if (!commonChar) {
            return res;
        }
        for (let j = 1; j < strs.length; j++) {
            if (!strs[j][i] || strs[j][i] !== commonChar) {
                return res;
            }
        }
        res += commonChar;
        i++;
    }
};
