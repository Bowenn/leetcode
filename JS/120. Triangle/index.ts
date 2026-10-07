function minimumTotal(triangle: number[][]): number {
    const lastLayer = Array(triangle.length).fill(Infinity);
    lastLayer[0] = triangle[0][0];

    // dpArray[j] = Math.min(dpArray[j] + triangle[i][j], dpArray[j - 1] + triangle[i][j])
    for (let i = 1; i < triangle.length; i++) {
        for (let j = triangle[i].length - 1; j >= 0; j--) {
            lastLayer[j] = Math.min(lastLayer[j - 1] ?? Infinity, lastLayer[j]) + triangle[i][j];
        }
    }

    // console.log(lastLayer);

    return Math.min(...lastLayer);
};
