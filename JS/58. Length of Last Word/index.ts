function lengthOfLastWord(s: string): number {
    let meetWord = false;
    let tailSpace = 0;
    for (let i = 0; i < s.length; i++) {
        if (s[s.length - 1 - i] === ' ') {
            if (meetWord) {
                return i - tailSpace;
            }
            else {
                tailSpace++;
            }
        }
        else {
            meetWord = true;
        }
    }
    return meetWord ? s.length - tailSpace : 0;
};
