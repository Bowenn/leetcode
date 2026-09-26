function climbStairs(n: number): number {
    // f(n) = f(n - 1) + f(n - 2)
    let temp1 = 1; // f(n - 1), start with f(1)
    let temp2 = 1; // f(n - 2), start with f(0)

    for (let i = 2; i <= n; i++) {
        const fi = temp1 + temp2;
        temp2 = temp1; // f(n - 2) => f(n - 1)
        temp1 = fi; // f(n - 1) => f(n)
    }

    return temp1;
};
