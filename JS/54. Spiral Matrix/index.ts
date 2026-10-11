function spiralOrder(matrix: number[][]): number[] {
    const m = matrix.length;
    const n = matrix[0].length;
    const output: number[] = [];
    
    let up = 0; // start
    let left = 0; // start
    let right = n; // edge
    let down = m; // edge
    const moveARound = (): void => {
        if (down - up === 1) {
            for (let i = left; i < right; i++) {
                output.push(matrix[up][i]);
            }
            up++;
            down--;
        }
        else if (right - left === 1) {
            for (let i = up; i < down; i++) {
                output.push(matrix[i][left]);
            }
            left++;
            right--;
        }
        else {
            for (let i = left; i < right; i++) {
                output.push(matrix[up][i]);
            }
            for (let i = up + 1; i < down; i++) {
                output.push(matrix[i][right - 1]);
            }
            for (let i = right - 2; i >= left; i--) {
                output.push(matrix[down - 1][i]);
            }
            for (let i = down - 2; i > up; i--) {
                output.push(matrix[i][left]);
            }
            up++;
            left++;
            down--;
            right--;
        }
    };

    while (left < right && up < down) {
        moveARound();
    }

    return output;
};
