export {};

class BST {
    treeArray: Array<number | undefined>; // use an array to store instead of node, for simplicity
    constructor(arr?: Array<number | undefined>) {
        if (!arr) {
            this.treeArray = [];
            return;
        }
        this.treeArray = arr;
    }

    static buildBalancedBSTFromSortedArray(sortedArr: number[]): BST {
        const bst = new BST();
        if (!sortedArr || sortedArr.length === 0) {
            return bst;
        }

        const height = Math.floor(Math.log2(sortedArr.length));
        const maxCapacity = 2 ** (height + 1) - 1;
        bst.treeArray = new Array(maxCapacity).fill(undefined);
        
        const buildTree = (baseTreeNodeIndex: number, lIndex: number, rIndex: number) => {
            if (rIndex < lIndex) {
                return;
            }

            const mid = Math.ceil((lIndex + rIndex) / 2);
            // both ceil and floor are ok
            // const mid = Math.floor((lIndex + rIndex) / 2);

            bst.treeArray[baseTreeNodeIndex] = sortedArr[mid];

            buildTree(baseTreeNodeIndex * 2 + 1, lIndex, mid - 1);
            buildTree(baseTreeNodeIndex * 2 + 2, mid + 1, rIndex);
        };
        
        buildTree(0, 0, sortedArr.length - 1);

        return bst;
    }
}

const input = Array.from({ length: 30 }, (_, i) => i + 1); // [1, 2, 3, ...]
// eslint-disable-next-line prefer-const
let a = BST.buildBalancedBSTFromSortedArray(input);
console.log(a);