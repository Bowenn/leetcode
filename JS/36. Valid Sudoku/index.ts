function isValidSudoku(board: string[][]): boolean {
    const scanRow = (rowIndex: number) => {
        const nSet = new Set<string>();
        for (let i = 0; i < 9; i++) {
            if (board[rowIndex][i] === '.') {
                continue;
            }
            if (nSet.has(board[rowIndex][i])) {
                return false;
            }
            nSet.add(board[rowIndex][i]);
        }
        return true;
    };
    const scanCol = (colIndex: number) => {
        const nSet = new Set<string>();
        for (let i = 0; i < 9; i++) {
            if (board[i][colIndex] === '.') {
                continue;
            }
            if (nSet.has(board[i][colIndex])) {
                return false;
            }
            nSet.add(board[i][colIndex]);
        }
        return true;
    };
    const scanSquare = (y: number, x: number) => {
        const nSet = new Set<string>();
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[y + i][x + j] === '.') {
                    continue;
                }
                if (nSet.has(board[y + i][x + j])) {
                    return false;
                }
                nSet.add(board[y + i][x + j]);
            }
        }
        return true;
    };

    for (let i = 0; i < 9; i++) {
        if (!scanRow(i)) {
            return false;
        }
        if (!scanCol(i)) {
            return false;
        }
    }
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (!scanSquare(i * 3, j * 3)) {
                return false;
            }
        }
    }

    return true;
};
