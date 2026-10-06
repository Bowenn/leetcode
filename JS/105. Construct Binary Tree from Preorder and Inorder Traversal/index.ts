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

// O(n) O(n)
function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
    const n = preorder.length;
    const inOrderMap = new Map<number, number>(); // <val, index>
    for (let i = 0; i < n; i++) {
        inOrderMap.set(inorder[i], i);
    }
    const build = (preL: number, preR: number, inL: number): TreeNode | null => {
        if (preL === preR) {
            return new TreeNode(preorder[preL]);
        }
        if (preL > preR) {
            return null;
        }
        const root = new TreeNode(preorder[preL]);
        const inRootIndex = inOrderMap.get(preorder[preL])!;
        const nodeCount = inRootIndex - inL;
        root.left = build(preL + 1, preL + nodeCount, inL);
        root.right = build(preL + nodeCount + 1, preR, inRootIndex + 1);
        return root;
    };

    return build(0, n - 1, 0);
};

// O(n^2) O(n)
function buildTree2(preorder: number[], inorder: number[]): TreeNode | null {
    const n = preorder.length;
    const build = (preL: number, preR: number, inL: number, inR: number): TreeNode | null => {
        if (preL === preR) {
            return new TreeNode(preorder[preL]);
        }
        if (preL > preR) {
            return null;
        }
        const root = new TreeNode(preorder[preL]);
        let inRootIndex = inL;
        while (inorder[inRootIndex] !== preorder[preL]) {
            inRootIndex++;
        }
        const nodeCount = inRootIndex - inL;
        root.left = build(preL + 1, preL + nodeCount, inL, inRootIndex - 1);
        root.right = build(preL + nodeCount + 1, preR, inRootIndex + 1, inR);
        return root;
    };

    return build(0, n - 1, 0, n - 1);
};
