/* eslint-disable quote-props */
function reverseVowels(s: string): string {
    const sArr = s.split('');
    const toReverse: Array<[string, number]> = [];

    // optional optimization: use a Set instead of an object for vowel lookup
    // const vowelSet = new Set(['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U']);
    // const vowelSet = new Set('aeiouAEIOU');
    const vowelDict: Record<string, boolean> = {
        'a': true,
        'e': true,
        'i': true,
        'o': true,
        'u': true,
        'A': true,
        'E': true,
        'I': true,
        'O': true,
        'U': true
    };
    for (let i = 0; i < s.length; i++) {
        if (vowelDict[s[i]]) {
            toReverse.push([s[i], i]);
        }
    }

    for (let i = 0; i < toReverse.length; i++) {
        sArr[toReverse[i][1]] = toReverse[toReverse.length - 1 - i][0];
    }

    return sArr.join('');
};
