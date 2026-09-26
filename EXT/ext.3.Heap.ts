export {};

class minHeap {
    heapArray: number[];
    size: number;
    constructor(size: number) {
        this.heapArray = [];
        this.size = size;
    }

    compare(a: number, b: number): boolean {
        return a < b;
    }

    swapNodes(index: number): void {
        const left = index * 2 + 1;
        const right = index * 2 + 2;
        let smallest = index;

        if (left < this.heapArray.length && this.compare(this.heapArray[left], this.heapArray[smallest])) {
            smallest = left;
        }
        if (right < this.heapArray.length && this.compare(this.heapArray[right], this.heapArray[smallest])) {
            smallest = right;
        }
        if (smallest !== index) {
            const temp = this.heapArray[index];
            this.heapArray[index] = this.heapArray[smallest];
            this.heapArray[smallest] = temp;
            this.swapNodes(smallest);
        }
    }

    insert(val: number): void {
        if (this.heapArray.length < this.size) {
            this.heapArray.push(val);
            let index = this.heapArray.length - 1;
            while (index > 0) {
                const parentIndex = Math.floor((index - 1) / 2);
                if (this.compare(this.heapArray[index], this.heapArray[parentIndex])) {
                    const temp = this.heapArray[index];
                    this.heapArray[index] = this.heapArray[parentIndex];
                    this.heapArray[parentIndex] = temp;
                    index = parentIndex;
                }
                else {
                    break;
                }
            }
        }
        // depending on the requirement, we can change the logic here
        else if (this.compare(val, this.heapArray[0])) {
            this.heapArray[0] = val;
            this.swapNodes(0);
        }
    }
    
    peek(): number | undefined {
        return this.heapArray[0];
    }

    pop(): number | undefined {
        if (this.heapArray.length === 0) {
            return undefined;
        }
        const root = this.heapArray[0];
        const last = this.heapArray.pop();
        if (this.heapArray.length > 0 && last !== undefined) {
            this.heapArray[0] = last;
            this.swapNodes(0);
        }
        return root;
    }
}
