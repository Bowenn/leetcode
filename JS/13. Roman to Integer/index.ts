function romanToInt(s: string): number {
    const numMap = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
    };
    
    const stack: number[] = [];
    for (let i = 0; i < s.length; i++) {
        let v = numMap[s[i] as keyof typeof numMap];
        while (stack.length && stack[stack.length - 1] < v) {
            v -= stack[stack.length - 1];
            stack.pop();
        }
        stack.push(v);
    }

    return stack.reduce((res, v) => res + v);
};
