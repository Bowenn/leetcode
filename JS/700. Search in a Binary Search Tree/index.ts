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

function searchBST(root: TreeNode | null, val: number): TreeNode | null {
    if (!root) {
        return null;
    }

    let curNode = root;
    while (true) {
        if (curNode.val === val) {
            return curNode;
        }
        else if (curNode.val > val) {
            if (curNode.left) {
                curNode = curNode.left;
            }
            else {
                return null;
            }
        }
        else {
            if (curNode.right) {
                curNode = curNode.right;
            }
            else {
                return null;
            }
        }
    }
};
