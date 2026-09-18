function numTilings(n: number): number {
    // f(n) = f(n - 1) + f(n - 2) + f(n - 3) * 2 + f(n - 4) * 2 + ... + f(0) * 2
    //      = f(n - 1) + f(n - 2) + sumPart * 2
    const BASE = 1000000007;
    const tempN = [1, 1, 2]; // [sumPart, f(n - 2), f(n - 1)], initialed with 0, f(1), f(2)
    if (n < 3) {
        return tempN[n];
    }

    for (let i = 3; i <= n; i++) {
        const newN = (tempN[2] + tempN[1] + tempN[0] * 2) % BASE;
        tempN[0] = (tempN[1] + tempN[0]) % BASE;
        tempN[1] = tempN[2];
        tempN[2] = newN;
    }

    return tempN[2];
};
