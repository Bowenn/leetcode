export {};

class MyMinHeap {
    size: number;
    treeArray: Array<[number, string]>; // [[value, word]...]

    constructor(size: number) {
        this.size = size;
        this.treeArray = [];
    }

    // compareNode(indexA: number, indexB: number): boolean {
    //     if (this.treeArray[indexA][0] > this.treeArray[indexB][0]) {
    //         return true;
    //     }
    //     else if (this.treeArray[indexA][0] === this.treeArray[indexB][0]) {
    //         return this.treeArray[indexA][1] < this.treeArray[indexB][1];
    //     }
    //     return false;
    // }
    compareNode(itemA: [number, string], itemB: [number, string]): boolean {
        if (itemA[0] > itemB[0]) {
            return true;
        }
        else if (itemA[0] === itemB[0]) {
            return itemA[1] < itemB[1];
        }
        return false;
    }

    swapNode(index: number): void {
        let smallest = index;
        const left = index * 2 + 1;
        const right = index * 2 + 2;

        if (left < this.treeArray.length && this.compareNode(this.treeArray[smallest], this.treeArray[left])) {
            smallest = left;
        }

        if (right < this.treeArray.length && this.compareNode(this.treeArray[smallest], this.treeArray[right])) {
            smallest = right;
        }

        if (smallest === index) {
             
            return;
        }
        else {
            const temp = this.treeArray[smallest];
            this.treeArray[smallest] = this.treeArray[index];
            this.treeArray[index] = temp;
            this.swapNode(smallest);
        }
    }

    add(val: number, word: string): void {
        if (this.treeArray.length < this.size) {
            this.treeArray.push([val, word]);
            // siftUp
            let curIndex = this.treeArray.length - 1;
            while (curIndex > 0) {
                const parentIndex = Math.floor((curIndex - 1) / 2);
                if (this.compareNode(this.treeArray[parentIndex], this.treeArray[curIndex])) {
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
        else if (this.compareNode([val, word], this.treeArray[0])) {
            this.treeArray[0] = [val, word];
            this.swapNode(0);
        }
    }

    pop(): [number, string] | null {
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

function topKFrequent(words: string[], k: number): string[] {
    const wordsMap = new Map<string, number>();

    words.forEach(word => {
        const count = (wordsMap.get(word) || 0) + 1;
        wordsMap.set(word, count);
    });

    // console.log(wordsMap);

    const minHeap = new MyMinHeap(k);
    wordsMap.forEach((word, count) => {
        minHeap.add(word, count);
    });

    // console.log(minHeap.treeArray[0][0], minHeap.treeArray[0][1], )

    const res = [];
    while (minHeap.treeArray.length) {
        res.unshift(minHeap.pop()![1]);
    }

    return res;
};
