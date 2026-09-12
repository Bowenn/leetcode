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

function goodNodes(root: TreeNode | null): number {
    if (!root) {
        return 0;
    }

    let res = 0;

    const dfs = (node: TreeNode, threshold: number) => {
        let nextThreshold = threshold;
        if (node.val >= threshold) {
            res++;
            nextThreshold = node.val;
        }
        node.left && dfs(node.left, nextThreshold);
        node.right && dfs(node.right, nextThreshold);
    };

    dfs(root, root.val);

    return res;
};
