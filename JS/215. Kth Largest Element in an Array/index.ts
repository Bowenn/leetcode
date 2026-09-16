
// Quickselect method O(n) average time complexity, O(n^2) worst case time complexity
// But I think the min heap method is better, because it has O(nlogk) time complexity and O(k) space complexity
class MyMinHeap {
    n: number;
    treeArray: Array<number>;
    constructor(n: number) {
        this.n = n;
        this.treeArray = [];
    }

    sortNode(index: number): void {
        let smallest = index;
        const left = index * 2 + 1;
        const right = index * 2 + 2;

        if (left < this.n && this.treeArray[left] < this.treeArray[smallest]) {
            smallest = left;
        }
        if (right < this.n && this.treeArray[right] < this.treeArray[smallest]) {
            smallest = right;
        }

        if (smallest !== index) {
            const t = this.treeArray[index];
            this.treeArray[index] = this.treeArray[smallest];
            this.treeArray[smallest] = t;
            this.sortNode(smallest);
        }
    }

    insert(v: number) {
        if (this.treeArray.length < this.n) {
            this.treeArray.push(v);
            let idx = this.treeArray.length - 1;
            while (idx > 0) {
                const parent = Math.floor((idx - 1) / 2);
                if (this.treeArray[idx] < this.treeArray[parent]) {
                    const temp = this.treeArray[idx];
                    this.treeArray[idx] = this.treeArray[parent];
                    this.treeArray[parent] = temp;
                    idx = parent;
                } else {
                    break;
                }
            }
        }
        else {
            if (v > this.treeArray[0]) {
                this.treeArray[0] = v;
                this.sortNode(0);
            }
        }
    }
}
function findKthLargest(nums: number[], k: number): number {
    const pTree = new MyMinHeap(k);
    for (let i = 0; i < nums.length; i++) {
        pTree.insert(nums[i]);
    }
    return pTree.treeArray[0];
};
