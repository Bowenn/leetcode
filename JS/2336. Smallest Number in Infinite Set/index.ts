class SmallestInfiniteSet {
    numbersRemain: Array<[number, number]> = [[Infinity, 1]];
    spaceLimit = 4;
    constructor() {
    }

    popSmallest(): number {
        const toRemove = this.numbersRemain[this.numbersRemain.length - 1][1];
        if (this.numbersRemain[this.numbersRemain.length - 1][0] === this.numbersRemain[this.numbersRemain.length - 1][1]) {
            this.numbersRemain.pop();
        }
        else {
            this.numbersRemain[this.numbersRemain.length - 1][1]++;
        }
        return toRemove;
    }

    addBack(num: number): void {
        if (this.numbersRemain[this.numbersRemain.length - 1][1] > num) {
            this.numbersRemain.push([num, num]);
        }
        for (let i = this.numbersRemain.length - 2; i >= 0; i--) {
            if (this.numbersRemain[i][1] > num && this.numbersRemain[i + 1][0] < num) {
                this.numbersRemain.splice(i + 1, 0, [num, num]);
                break;
            }
            else if (this.numbersRemain[i + 1][0] > num) {
                break;
            }
        }
        this.spaceOptimize();
    }

    spaceOptimize(): void {
        if (this.numbersRemain.length > this.spaceLimit) {
            const newNumbersRemain: Array<[number, number]> = [];
            for (let i = 0; i < this.numbersRemain.length; i++) {
                if (newNumbersRemain.length > 0 && newNumbersRemain[newNumbersRemain.length - 1][1] === this.numbersRemain[i][0] + 1) {
                    newNumbersRemain[newNumbersRemain.length - 1][1] = this.numbersRemain[i][1];
                }
                else {
                    newNumbersRemain.push(this.numbersRemain[i]);
                }
            }
            this.numbersRemain = newNumbersRemain;
            this.spaceLimit = newNumbersRemain.length * 2;
        }
    }
}

/**
 * Your SmallestInfiniteSet object will be instantiated and called as such:
 * var obj = new SmallestInfiniteSet()
 * var param_1 = obj.popSmallest()
 * obj.addBack(num)
 */
