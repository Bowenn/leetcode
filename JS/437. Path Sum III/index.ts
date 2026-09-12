/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

export {};

class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;

    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = val === undefined ? 0 : val;
        this.left = left === undefined ? null : left;
        this.right = right === undefined ? null : right;
    }
}

// optimized solution using prefix sum and hash map instead of stack to store all the prefix sum
function pathSum(root: TreeNode | null, targetSum: number): number {
    if (!root) {
        return 0;
    }

    let res = 0;

    const subSumHashMap: Map<number, number> = new Map();
    subSumHashMap.set(0, 1);

    const dfs = (node: TreeNode, currentSum: number) => {
        const totalSum = currentSum + node.val;
        const targetSubSum = totalSum - targetSum;
        res += subSumHashMap.get(targetSubSum) || 0;

        subSumHashMap.set(totalSum, (subSumHashMap.get(totalSum) || 0) + 1);

        node.left && dfs(node.left, totalSum);
        node.right && dfs(node.right, totalSum);

        subSumHashMap.set(totalSum, (subSumHashMap.get(totalSum) || 0) - 1);
    };

    dfs(root, 0);

    return res;
};

function pathSumOld(root: TreeNode | null, targetSum: number): number {
    if (!root) {
        return 0;
    }

    let res = 0;

    const subSumStack: number[] = [0];

    const dfs = (node: TreeNode) => {
        const totalSum = subSumStack[subSumStack.length - 1] + node.val;
        subSumStack.forEach(subSum => {
            if (totalSum - subSum === targetSum) {
                res++;
            }
        });

        subSumStack.push(totalSum);

        node.left && dfs(node.left);
        node.right && dfs(node.right);

        subSumStack.pop();
    };

    dfs(root);

    return res;
};
