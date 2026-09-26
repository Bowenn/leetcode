
function decodeString(s: string): string {
    const decodeStack: Array<string | number> = [];

    const isDigit = (char: string) => {
        return !Number.isNaN(+char);
    };

    let tempNumber = 0;
    let tempString = '';
    for (let i = 0; i < s.length; i++) {
        if (isDigit(s[i])) {
            tempNumber *= 10;
            tempNumber += +s[i];
        }
        else if (s[i] === '[') {
            decodeStack.push(tempString);
            tempString = '';
            decodeStack.push(tempNumber);
            tempNumber = 0;
        }
        else if (s[i] === ']') {
            const repeatNumber = decodeStack[decodeStack.length - 1] as number;
            decodeStack.pop();
            tempString = tempString.repeat(repeatNumber);
            if (typeof decodeStack[decodeStack.length - 1] === 'string') {
                tempString = decodeStack[decodeStack.length - 1] + tempString;
                decodeStack.pop();
            }
        }
        else {
            tempString += s[i];
        }
    }

    return tempString;
};
