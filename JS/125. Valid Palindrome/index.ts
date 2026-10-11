function isPalindrome(s: string): boolean {
    const splitedS = s.toLowerCase().split('').filter(char => char >= 'a' && char <= 'z' || char >= '0' && char <= '9');
    for (let i = 0; i * 2 < splitedS.length; i++) {
        if (splitedS[i] !== splitedS[splitedS.length - 1 - i]) {
            return false;
        }
    }
    return true;
};
