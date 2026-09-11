function isDigit(char: string) {
    return +char >= 0 && +char <= 9;
}

function decodeString(s: string): string {
    const decodeStack: Array<string | number> = [];
    let numTemp = 0;
    let strTemp: string[] = [];
    const resolveStrTemp = () => {
        if (strTemp.length) {
            if (decodeStack.length > 0 && typeof decodeStack[decodeStack.length - 1] === 'string') {
                decodeStack[decodeStack.length - 1] += strTemp.join('');
            }
            else {
                decodeStack.push(strTemp.join(''));
            }
            strTemp = [];
        }
    };

    for (let i = 0; i < s.length; i++) {
        if (isDigit(s[i])) {
            resolveStrTemp();
            if (numTemp > 0) {
                numTemp *= 10;
            }
            numTemp += +s[i];
        }
        else if (s[i] === '[') {
            decodeStack.push(numTemp);
            numTemp = 0;
        }
        else if (s[i] === ']') {
            resolveStrTemp();
            const toRepeat = decodeStack.pop() as string;
            const repeatedStr = toRepeat.repeat(decodeStack.pop() as number);

            if (decodeStack.length > 0 && typeof decodeStack[decodeStack.length - 1] === 'string') {
                decodeStack[decodeStack.length - 1] += repeatedStr;
            }
            else {
                decodeStack.push(repeatedStr);
            }
        }
        else {
            strTemp.push(s[i]);
        }
    }

    resolveStrTemp();
    return decodeStack.join('');
};
