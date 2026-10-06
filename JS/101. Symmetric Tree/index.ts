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

function isSymmetric(root: TreeNode | null): boolean {
    if (!root) {
        return true;
    }

    const checkNodes = (node1: TreeNode | null, node2: TreeNode | null): boolean => {
        if (node1 === null || node2 === null) {
            return node1 === node2;
        }
        return node1.val === node2.val && checkNodes(node1.left, node2.right) && checkNodes(node1.right, node2.left);
    };

    return checkNodes(root.left, root.right);
};
