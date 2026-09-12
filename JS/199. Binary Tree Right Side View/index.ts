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

function rightSideView(root: TreeNode | null): number[] {
    if (!root) {
        return [];
    }

    const res: number[] = [];

    const dfs = (node: TreeNode, depth: number = 1) => {
        if (depth > res.length) {
            res.push(node.val);
        }
        else {
            res[depth - 1] = node.val;
        }

        node.left && dfs(node.left, depth + 1);
        node.right && dfs(node.right, depth + 1);
    };

    dfs(root);

    return res;
};
