export {};

class MyMinHeap {
    size: number
    treeArray: number[];

    constructor(size: number) {
        this.size = size;
        this.treeArray = [];
    }

    swapNode(index: number): void {
        let smallest = index;
        const left = index * 2 + 1;
        const right = index * 2 + 2;

        if (left < this.size && this.treeArray[smallest] > this.treeArray[left]) {
            smallest = left;
        }

        if (right < this.size && this.treeArray[smallest] > this.treeArray[right]) {
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

    add(val: number): void {
        if (this.treeArray.length < this.size) {
            this.treeArray.push(val);
            // siftUp
            let curIndex = this.treeArray.length - 1;
            while (curIndex > 0) {
                const parentIndex = Math.floor((curIndex - 1) / 2);
                if (this.treeArray[parentIndex] > this.treeArray[curIndex]) {
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
        else if (val > this.treeArray[0]) {
            this.treeArray[0] = val;
            this.swapNode(0);
        }
    }
}

function maxScore(nums1: number[], nums2: number[], k: number): number {
    const pairedNums = nums1.map((v, i) => [v, nums2[i]]);
    pairedNums.sort((a, b) => b[1] - a[1]);

    const minHeap = new MyMinHeap(k);
    let curSum = 0;

    for (let i = 0; i < k; i++) {
        curSum += pairedNums[i][0];
        minHeap.add(pairedNums[i][0]);
    }

    let maxRes = curSum * pairedNums[k - 1][1];

    for (let i = k; i < pairedNums.length; i++) {
        if (pairedNums[i][0] > minHeap.treeArray[0]) {
            curSum = curSum - minHeap.treeArray[0] + pairedNums[i][0];
            minHeap.add(pairedNums[i][0]);
            maxRes = Math.max(maxRes, curSum * pairedNums[i][1]);
        }
    }

    return maxRes;
};
