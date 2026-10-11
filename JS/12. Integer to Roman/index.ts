function intToRoman(num: number): string {
    const strMap = [
        ['I', 'V'],
        ['X', 'L'],
        ['C', 'D'],
        ['M'],
    ];

    const res = [];
    let i = 0;
    while (num > 0) {
        const mod10 = num % 10;
        const mod5 = mod10 % 5;
        if (mod10 === 9) {
            res.push(strMap[i][0] + strMap[i + 1][0]);
        }
        else if (mod10 === 4) {
            res.push(strMap[i][0] + strMap[i][1]);

        }
        else {
            res.push(strMap[i][0].repeat(mod5));
            if (mod10 >= 5) {
                res.push(strMap[i][1]);
            }
        }
        i++;
        num = (num - mod10) / 10;
    }

    return res.reverse().join('');
};
