function reverse(x: number): number {
    const maxThreshold = Math.pow(2, 31) / 10;
    let flag = false;
    if (x < 0) {
        flag = true;
        x = -x;
    }
    let res = 0;

    while (x > 0) {
        const modV = x % 10;
        if (res > maxThreshold - modV / 10) {
            return 0;
        }
        res *= 10;
        res += modV;
        x = (x - modV) / 10;
    }

    return flag ? -res : res;
};
