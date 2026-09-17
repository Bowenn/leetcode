export {};

// priority queue methods: add, pop, swapNode
// time: O((k+candidates)logcandidates)
// better time complexity but takes more time.
class MyMinHeap {
    treeArray: Array<[number, boolean]>; // [[value, fromLeft]...]

    constructor() {
        this.treeArray = [];
    }

    swapNode(index: number): void {
        let smallest = index;
        const left = index * 2 + 1;
        const right = index * 2 + 2;

        if (left < this.treeArray.length && this.treeArray[smallest][0] > this.treeArray[left][0]) {
            smallest = left;
        }

        if (right < this.treeArray.length && this.treeArray[smallest][0] > this.treeArray[right][0]) {
            smallest = right;
        }

        if (smallest === index) {
            // eslint-disable-next-line no-useless-return
            return;
        }
        else {
            const temp = this.treeArray[smallest];
            this.treeArray[smallest] = this.treeArray[index];
            this.treeArray[index] = temp;
            this.swapNode(smallest);
        }
    }

    add(val: number, fromLeft: boolean): void {
        this.treeArray.push([val, fromLeft]);
        // siftUp
        let curIndex = this.treeArray.length - 1;
        while (curIndex > 0) {
            const parentIndex = Math.floor((curIndex - 1) / 2);
            if (this.treeArray[parentIndex][0] > this.treeArray[curIndex][0]) {
                const temp = this.treeArray[parentIndex];
                this.treeArray[parentIndex] = this.treeArray[curIndex];
                this.treeArray[curIndex] = temp;
                curIndex = parentIndex;
            }
            else {
                return;
            }
        }
    }

    pop(): [number, boolean] | null {
        if (this.treeArray.length === 0) return null;

        const min = this.treeArray[0];
        const last = this.treeArray.pop()!;

        // If there are still elements left, move the last element to the root and sift down
        if (this.treeArray.length > 0) {
            this.treeArray[0] = last;
            this.swapNode(0);
        }

        return min;
    }
}

function totalCost(costs: number[], k: number, candidates: number): number {
    const n = costs.length;
    let left = candidates - 1;
    let right = n - candidates;

    const minHeap = new MyMinHeap();

    for (let i = 0; i <= left; i++) {
        minHeap.add(costs[i], true);
    }

    for (let i = Math.max(right, left + 1); i < n; i++) {
        minHeap.add(costs[i], false);
    }

    let res = 0;

    while (k > 0) {
        res += minHeap.treeArray[0][0];
        if (minHeap.treeArray[0][1]) {
            if (left < right - 1) {
                left++;
                minHeap.treeArray[0][0] = costs[left];
                minHeap.swapNode(0);
            }
            else {
                minHeap.pop();
            }
        }
        else {
            if (left < right - 1) {
                right--;
                minHeap.treeArray[0][0] = costs[right];
                minHeap.swapNode(0);
            }
            else {
                minHeap.pop();
            }
        }
        k--;
    }

    return res;
};

// my own solution, use heap until left and right meet, then sort the remaining heap and pick k smallest
// quicker than the above solution, but worse time complexity. And still slower than use 2 heaps to maintain the left and right candidates.
class MyMinHeap2 {
    size: number
    treeArray: Array<[number, boolean]>; // [[value, fromLeft]...]

    constructor(size: number) {
        this.size = size;
        this.treeArray = [];
    }

    swapNode(index: number): void {
        let smallest = index;
        const left = index * 2 + 1;
        const right = index * 2 + 2;

        if (left < this.size && this.treeArray[smallest][0] > this.treeArray[left][0]) {
            smallest = left;
        }

        if (right < this.size && this.treeArray[smallest][0] > this.treeArray[right][0]) {
            smallest = right;
        }

        if (smallest === index) {
            // eslint-disable-next-line no-useless-return
            return;
        }
        else {
            const temp = this.treeArray[smallest];
            this.treeArray[smallest] = this.treeArray[index];
            this.treeArray[index] = temp;
            this.swapNode(smallest);
        }
    }

    add(val: number, fromLeft: boolean): void {
        if (this.treeArray.length < this.size) {
            this.treeArray.push([val, fromLeft]);
            // siftUp
            let curIndex = this.treeArray.length - 1;
            while (curIndex > 0) {
                const parentIndex = Math.floor((curIndex - 1) / 2);
                if (this.treeArray[parentIndex][0] > this.treeArray[curIndex][0]) {
                    const temp = this.treeArray[parentIndex];
                    this.treeArray[parentIndex] = this.treeArray[curIndex];
                    this.treeArray[curIndex] = temp;
                    curIndex = parentIndex;
                }
                else {
                    return;
                }
            }
        }
        else if (val > this.treeArray[0][0]) {
            this.treeArray[0] = [val, fromLeft];
            this.swapNode(0);
        }
    }
}

function totalCost2(costs: number[], k: number, candidates: number): number {
    const n = costs.length;
    let left = candidates - 1;
    let right = n - candidates;

    if (left >= right) { // normal sort and pick
        costs.sort((a, b) => a - b);
        let res = 0;
        for (let i = 0; i < k; i++) {
            res += costs[i];
        }
        return res;
    }

    const minHeap = new MyMinHeap2(candidates * 2);

    for (let i = 0; i <= left; i++) {
        minHeap.add(costs[i], true);
    }

    for (let i = right; i < n; i++) {
        minHeap.add(costs[i], false);
    }

    let res = 0;

    while (left < right - 1 && k > 0) {
        res += minHeap.treeArray[0][0];
        if (minHeap.treeArray[0][1]) {
            left++;
            minHeap.treeArray[0][0] = costs[left];
            minHeap.swapNode(0);
        }
        else {
            right--;
            minHeap.treeArray[0][0] = costs[right];
            minHeap.swapNode(0);
        }
        k--;
    }

    if (k > 0) {
        const costsLeft = minHeap.treeArray.map(item => item[0]);
        costsLeft.sort((a, b) => a - b);
        for (let i = 0; i < k; i++) {
            res += costsLeft[i];
        }
    }

    return res;
};
