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

function sumNumbers(root: TreeNode | null): number {
    let result = 0;

    const dfs = (node: TreeNode | null, tempVal: number) => {
        if (!node) {
            return;
        }
        const newTempVal = tempVal * 10 + node.val;
        if (!node.left && !node.right) {
            result += newTempVal;
            return;
        }

        node.left && dfs(node.left, newTempVal);
        node.right && dfs(node.right, newTempVal);
    };

    dfs(root, 0);

    return result;
};
