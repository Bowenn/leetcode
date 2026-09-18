function equalPairs(grid: number[][]): number {
    const seqDict: Record<string, [number, number]> = {}; // {uniqueSeq: [rowCounts, columnCounts]}

    const n = grid.length;

    // optional optimization: use a Trie (Prefix Tree) to store the sequences

    // 1. count rows
    grid.map(row => row.join(',')).forEach(rowStr => {
        if (!(rowStr in seqDict)) {
            seqDict[rowStr] = [0, 0];
        }
        seqDict[rowStr][0]++;
    });

    // 2. count columns
    const flippedGrid: number[][] = new Array(n).fill([]).map(() => new Array(n));
    grid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            flippedGrid[colIndex][rowIndex] = cell;
        });
    });
    flippedGrid.map(col => col.join(',')).forEach(colStr => {
        if (colStr in seqDict) {
            seqDict[colStr][1]++;
        }
    });

    // 3. count pairs
    return Object.values(seqDict).reduce((res, counts) => {
        res += counts[0] * counts[1];
        return res;
    }, 0);
};
