function dailyTemperatures(temperatures: number[]): number[] {
    const n = temperatures.length;
    const answer = Array(n).fill(0);

    const tStack: number[] = []; // only stack index
    for (let i = n - 1; i >= 0; i--) {
        while (tStack.length && temperatures[tStack[tStack.length - 1]] <= temperatures[i]) {
            tStack.pop();
        }
        if (tStack.length) {
            answer[i] = tStack[tStack.length - 1] - i;
        }
        tStack.push(i);
    }

    return answer;
};
