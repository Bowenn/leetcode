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

function leafSimilar(root1: TreeNode | null, root2: TreeNode | null): boolean {
    if (!root1) {
        return !root2;
    }
    if (!root2) {
        return !root1;
    }

    const leaves1: number[] = [];

    const dfs1 = (root: TreeNode) => {
        root.left && dfs1(root.left);
        root.right && dfs1(root.right);
        !root.left && !root.right && leaves1.push(root.val);
    };

    dfs1(root1);

    let offsetIndex = 0;
    const dfs2 = (root: TreeNode): boolean => {
        if (offsetIndex >= leaves1.length) {
            return false;
        }
        if (root.left && !dfs2(root.left)) {
            return false;
        }
        if (root.right && !dfs2(root.right)) {
            return false;
        }
        if (!root.left && !root.right) {
            if (root.val !== leaves1[offsetIndex]) {
                return false;
            }
            offsetIndex++;
        }
        return true;
    };

    return dfs2(root2) && offsetIndex === leaves1.length;
};
