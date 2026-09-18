function countBits(n: number): number[] {
    if (!n) {
        return [0];
    }

    const res = [0];
    while (true) {
        const curLength = res.length;
        for (let i = 0; i < curLength; i++) {
            res.push(res[i] + 1);
            if (res.length === n + 1) {
                return res;
            }
        }
    }
};
