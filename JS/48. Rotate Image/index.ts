/**
 Do not return anything, modify matrix in-place instead.
 */
function rotate(matrix: number[][]): void {
    const n = matrix.length;
    const rotateASquare = (y: number, x: number) => {
        // rotate four square
        let temp = matrix[y][x];

        for (let i = 0; i < 4; i++) {
            const newY = x;
            const newX = n - 1 - y;
            const newTemp = matrix[newY][newX];
            matrix[newY][newX] = temp;
            y = newY;
            x = newX;
            temp = newTemp;
        }
    };

    for (let i = 0; (i + 1) * 2 <= n; i++) {
        for (let j = 0; j * 2 < n; j++) {
            rotateASquare(i, j);
        }
    }
};
