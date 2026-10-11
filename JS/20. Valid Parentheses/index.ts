function isValid(s: string): boolean {
    const charStack = [];
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(' || s[i] === '{' || s[i] === '[') {
            charStack.push(s[i]);
        }
        else {
            if (
                !charStack.length
                || s[i] === ')' && charStack[charStack.length - 1] !== '('
                || s[i] === '}' && charStack[charStack.length - 1] !== '{'
                || s[i] === ']' && charStack[charStack.length - 1] !== '['
            ) {
                return false;
            }
            charStack.pop();
        }
    }

    return charStack.length === 0;
};
