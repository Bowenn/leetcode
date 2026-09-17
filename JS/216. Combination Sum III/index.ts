function combinationSum3(k: number, n: number): number[][] {
    const res: number[][] = [];

    const numStack: number[] = [];
    const dfs = (start: number, currentSum: number) => {
        if (numStack.length === k) {
            currentSum === n && res.push(numStack.slice());
            return;
        }

        if (currentSum >= n) {
            return;
        }

        for (let i = start; i <= 9; i++) {
            numStack.push(i);
            dfs(i + 1, currentSum + i);
            numStack.pop();
        }
    };

    dfs(1, 0);

    return res;
};
