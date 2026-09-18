function tribonacci(n: number): number {
    const resArr = [0, 1, 1];
    if (n <= 2) {
        return resArr[n];
    }
    for (let i = 3; i <= n; i++) {
        resArr.push(resArr[resArr.length - 1] + resArr[resArr.length - 2] + resArr[resArr.length - 3]);
    }
    return resArr[resArr.length - 1];
};
