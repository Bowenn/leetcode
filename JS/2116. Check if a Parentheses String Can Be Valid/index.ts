// time O(n) space O(1)
function canBeValid(s: string, locked: string): boolean {
    const n = s.length;
    if (n & 1) {
        return false;
    }

    let freeChar = 0;
    let bracketStack = 0;
    // first iterate through s L => R, try to match all ')' by treat unlocked char as '('
    for (let i = 0; i < n; i++) {
        if (locked[i] === '0') {
            freeChar++;
        }
        else if (s[i] === '(') {
            bracketStack++;
        }
        else {
            if (bracketStack) {
                bracketStack--;
            }
            else if (freeChar) {
                freeChar--;
            }
            else {
                return false;
            }
        }
    }

    // after one iteration, bracketStack is the number how many '(' left
    if (bracketStack === 0) {
        return true;
    }
    else if (freeChar < bracketStack) {
        return false;
    }

    // we then iterate R => L, try to replace unlocked char into ')' for bracketStack times
    let freeChar2 = 0;
    let bracketStack2 = 0;
    for (let i = n - 1; i >= 0; i--) {
        if (locked[i] === '0') {
            freeChar2++;
        }
        else if (s[i] === ')') {
            bracketStack2++;
        }
        else {
            if (bracketStack2) {
                bracketStack2--;
            }
            else if (freeChar2) {
                freeChar2--;
                bracketStack--;
            }
            else {
                return false;
            }
        }
        if (bracketStack === 0) {
            return true;
        }
    }

    return false;
};


// time O(n) space O(n)
function canBeValid2(s: string, locked: string): boolean {
    const n = s.length;
    if (n & 1) {
        return false;
    }
    const freeChar = [];
    const parenthesesLeft = [];
    for (let i = 0; i < n; i++) {
        if (locked[i] === '0') {
            freeChar.push(i);
        }
        else if (s[i] === '(') {
            parenthesesLeft.push(i);
        }
        else {
            if (parenthesesLeft.length) {
                parenthesesLeft.pop();
            }
            else if (freeChar.length) {
                freeChar.pop();
            }
            else {
                return false;
            }
        }
    }

    while (parenthesesLeft.length) {
        if (parenthesesLeft[parenthesesLeft.length - 1] < freeChar[freeChar.length - 1]) {
            parenthesesLeft.pop();
            freeChar.pop();
        }
        else {
            return false;
        }
    }

    return true;
};
