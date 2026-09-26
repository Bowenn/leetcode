function myPow(x: number, n: number): number {
    // return Math.pow(x, n);
    if (n === 0) {
        return 1;
    }
    else if (n < 0) {
        x = 1 / x;
        n = -n;
    }

    let res = 1;
    while (n > 0) {
        if (n & 1) {
            res *= x;
            n--;
        }
        else {
            x *= x;
            // n /= 2;
            n >>= 1;
        }
    }

    return res;
};
