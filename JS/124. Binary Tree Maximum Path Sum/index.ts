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

function maxPathSum(root: TreeNode | null): number {
    let maxSum = -Infinity;

    const calcSum = (node: TreeNode | null): number => {
        if (!node) {
            return -Infinity;
        }
        const leftContinueSum = calcSum(node.left);
        const rightContinueSum = calcSum(node.right);
        const maxContinueSum = Math.max(node.val, leftContinueSum + node.val, rightContinueSum + node.val);

        // console.log(node.val, leftContinueSum, rightContinueSum);
        maxSum = Math.max(maxSum, leftContinueSum, rightContinueSum, maxContinueSum, leftContinueSum + rightContinueSum + node.val);

        return maxContinueSum;
    };

    calcSum(root);

    return maxSum;
};
