export {};

// normal solution, time: O(n^2), space: O(1)
// use even/odd check instead of create new string with '*' between any 2 char in s, so that space can be optimized to O(1)
function longestPalindrome(s: string): string {
    const n = s.length;

    // instert '*' between any 2 char in s, so that any Palindrome Substring has a odd length
    const n2 = n * 2 - 1;
    let resLength = 1;
    let res = s[0];
    for (let i = 0; i < n2; i++) {
        let j = 1;
        for (; i - j >= 0 && i + j < n2; j++) {
            if ((i - j) & 1) {
                // compare 2 '*'
                continue;
            }
            if (s[(i - j) / 2] !== s[(i + j) / 2]) {
                break;
            }
        }
        if (i - j < 0 || i + j >= n2) {
            j++;
        }
        if (i & 1) {
            if (j - 1 > resLength) {
                resLength = j - 1;
                res = s.slice((i - j) / 2 + 1, (i - j) / 2 + 1 + j - 1);
            }
        }
        else {
            if (j - 1 > resLength) {
                resLength = j - 1;
                res = s.slice((i - j) / 2 + 1, (i - j) / 2 + 1 + j - 1);
            }
        }
    }

    return res;
};

// manacher's algorithm, time: O(n), space: O(n)
function longestPalindrome2(s: string): string {
    const newS = '*' + s.split('').join('*') + '*';
    const n = newS.length;

    const lengthPalindromeCache = Array(n).fill(0);
    let i = 0;

    let rightEdge = 0;
    let rightEdgePalindromeCenter = 0;
    while(i < n) {
        if (i <= rightEdge && 2 * rightEdgePalindromeCenter - i >= 0) {
            lengthPalindromeCache[i] = Math.min(
                rightEdge - i, // 不拓展rightEdge的话，最大就只能是rightEdge - i
                lengthPalindromeCache[2 * rightEdgePalindromeCenter - i] // 镜像的值，不能超过rightEdge
            );
        }
        let j = lengthPalindromeCache[i] + 1;
        while (i - j >= 0 && i + j < n) {
            if (newS[i - j] === newS[i + j]) {
                j++;
            }
            else {
                break;
            }
        }
        lengthPalindromeCache[i] = j - 1;

        if (i + j - 1 > rightEdge) {
            rightEdge = i + j - 1;
            rightEdgePalindromeCenter = i;
        }
        i++;
    }

    let maxCenter = 0;

    for (let i = 0; i < n; i++) {
        if (
            lengthPalindromeCache[i] > lengthPalindromeCache[maxCenter]
        ) {
            maxCenter = i;
        }
    }
    
    return newS.slice(maxCenter - lengthPalindromeCache[maxCenter], maxCenter + lengthPalindromeCache[maxCenter] + 1).replaceAll('*', '');
};
