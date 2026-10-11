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

/**
 Do not return anything, modify root in-place instead.
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

// Morris Traversal O(n) O(1)
function flatten(root: TreeNode | null): void {
    let curr = root;
    while (curr !== null) {
        if (curr.left !== null) {
            // Find the rightmost node of the left subtree
            let rightmost = curr.left;
            while (rightmost.right !== null) {
                rightmost = rightmost.right;
            }
            
            // Rewire the connections
            rightmost.right = curr.right;
            curr.right = curr.left;
            curr.left = null;
        }
        // Move to the next node on the right
        curr = curr.right;
    }
}

// dfs O(n) O(n)
function flatten1(root: TreeNode | null): void {
    if (!root) {
        return;
    }
    let curNode = new TreeNode();
    const dfs = (node: TreeNode | null) => {
        if (!node) {
            return;
        }
        const nextLeft = node.left;
        const nextRight = node.right;

        curNode.left = null;
        curNode.right = node;
        curNode = node;
        dfs(nextLeft);
        dfs(nextRight);
    };

    dfs(root); 
};
