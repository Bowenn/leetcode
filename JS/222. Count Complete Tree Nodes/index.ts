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

function countNodes(root: TreeNode | null): number {
    if (!root) {
        return 0;
    }

    const getDepth = (node: TreeNode | null): number => {
        if (!node) {
            return 0;
        }
        return getDepth(node.left) + 1;
    };

    let slotCounts = 0;
    let curNode: TreeNode | null = root;
    let leftDep = getDepth(curNode.left);
    let rightDep = getDepth(curNode.right);
    const totalDepth = leftDep + 1;
    while (true) {
        if (!curNode || leftDep === 0) {
            break;
        }
        if (leftDep === rightDep) {
            leftDep = rightDep - 1;
            curNode = curNode.right;
            rightDep = getDepth(curNode!.right);
        }
        else {
            slotCounts += Math.pow(2, rightDep);
            leftDep = leftDep - 1;
            curNode = curNode.left;
            rightDep = getDepth(curNode!.right);
        }
    }
    
    return Math.pow(2, totalDepth) - 1 - slotCounts;
};
