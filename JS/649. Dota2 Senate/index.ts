
// use queueHeadIndex instead of shift() to avoid its O(n) time complexity
function predictPartyVictory(senate: string): string {
    const senatorLeft = senate.split('') as Array<'R' | 'D'>;
    let queueHeadIndex = 0;
    const victoryStack: Array<'R' | 'D'> = [];

    while (senatorLeft.length - queueHeadIndex > victoryStack.length) {
        if (victoryStack.length && senatorLeft[queueHeadIndex] !== victoryStack[victoryStack.length - 1]) {
            // current senator is banned
            // senatorLeft.shift();
            queueHeadIndex++;
            victoryStack.pop();
        }
        else {
            // current senator can ban other senators
            senatorLeft.push(senatorLeft[queueHeadIndex]);
            victoryStack.push(senatorLeft[queueHeadIndex]);
            // senatorLeft.shift();
            queueHeadIndex++;
        }
    }
    return victoryStack[0] === 'D'
        ? 'Dire'
        : 'Radiant';
};

// optional solution with two queues, which is more intuitive and easier to understand
function predictPartyVictory2(senate: string): string {
    const n = senate.length;

    const radiant: number[] = [];
    const dire: number[] = [];

    // Fill queues with senator positions
    for (let i = 0; i < n; i++) {
        if (senate[i] === 'R') {
            radiant.push(i);
        } else {
            dire.push(i);
        }
    }

    let rFront = 0;
    let dFront = 0;

    // Simulate rounds
    while (rFront < radiant.length && dFront < dire.length) {
        const rIndex = radiant[rFront++];
        const dIndex = dire[dFront++];

        if (rIndex < dIndex) {
            // Radiant bans Dire, Radiant senator returns next round
            radiant.push(rIndex + n);
        } else {
            // Dire bans Radiant, Dire senator returns next round
            dire.push(dIndex + n);
        }
    }

    return rFront < radiant.length ? 'Radiant' : 'Dire';
}
