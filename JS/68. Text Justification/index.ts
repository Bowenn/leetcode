function fullJustify(words: string[], maxWidth: number): string[] {
    const result = [];
    let r = 0;

    while (r < words.length) {
        const line = [words[r]];
        let lineCount = words[r].length;
        r++;
        while (r < words.length && lineCount + 1 + words[r].length <= maxWidth) {
            line.push(words[r]);
            lineCount += 1 + words[r].length;
            r++;
        }
        if (r === words.length || line.length === 1) { // last line or one word single line
            result.push(line.join(' ') + ' '.repeat(maxWidth - lineCount));
        }
        else {
            const spaceLeft = maxWidth - lineCount;
            const extraSpace = spaceLeft % (line.length - 1);
            const baseSpace = (spaceLeft - extraSpace) / (line.length - 1);
            for (let i = 0; i < extraSpace; i++) {
                line[i] += ' ';
            }
            result.push(line.join(' '.repeat(baseSpace + 1)));
        }
    }

    return result;
};
