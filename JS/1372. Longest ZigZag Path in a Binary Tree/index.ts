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

function longestZigZag(root: TreeNode | null): number {
    if (!root || (!root.left && !root.right)) {
        return 0;
    }

    let res = 1;

    // True - left, False - right
    const dfs = (node: TreeNode, length: number, lastDirection?: boolean) => {
        node.left && dfs(node.left, lastDirection !== true ? length + 1 : 1, true);
        node.right && dfs(node.right, lastDirection !== false ? length + 1 : 1, false);
        res = Math.max(res, length);
    };

    dfs(root, 0);

    return res;
};
