function convert(s: string, numRows: number): string {
    if (numRows === 1) {
        return s;
    }
    const cycleLength = numRows * 2 - 2;

    const lines = Array(numRows).fill('');
    for (let i = 0; i < s.length; i++) {
        const modRes = i % cycleLength;
        const lineIndex = Math.min(modRes, cycleLength - modRes);
        lines[lineIndex] += s[i];
    }

    return lines.join('');
};
