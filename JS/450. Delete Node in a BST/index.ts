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

// optimized version, directly remove the target node and inherit its branch during the search process
function deleteNode(root: TreeNode | null, key: number): TreeNode | null {
    if (!root) {
        return null;
    }

    const searchBST = (node: TreeNode): TreeNode | null => {
        if (node.val === key) {
            // if node have both left and right branches, move the left one under the right one
            if (node.left && node.right) {
                let targetNode = node.right;
                while (targetNode.left) {
                    targetNode = targetNode.left;
                }
                targetNode.left = node.left;
            }
            return node;
        }
        if (node.val > key && node.left) {
            const leftRes = searchBST(node.left);
            if (leftRes) { // node found, remove and inherit its branch
                node.left = node.left.right || node.left.left;
            }
            return null;
        }
        if (node.val < key && node.right) {
            const rightRes = searchBST(node.right);
            if (rightRes) { // node found, remove and inherit its branch
                node.right = node.right.right || node.right.left;
            }
            return null;
        }
        return null;
    };

    const searchRes = searchBST(root);

    if (searchRes) { // target node is the root node
        return root.right || root.left;
    }
    return root;
};

function deleteNodeOld(root: TreeNode | null, key: number): TreeNode | null {
    if (!root) {
        return null;
    }

    // [targetNode, parentNode, isLeftBranch] | null
    const searchBST = (node: TreeNode): [TreeNode, TreeNode | null, boolean] | null => {
        if (node.val === key) {
            return [node, null, true];
        }
        if (node.val > key && node.left) {
            const leftRes = searchBST(node.left);
            if (leftRes && !leftRes[1]) {
                leftRes[1] = node;
                leftRes[2] = true;
            }
            return leftRes;
        }
        if (node.val < key && node.right) {
            const rightRes = searchBST(node.right);
            if (rightRes && !rightRes[1]) {
                rightRes[1] = node;
                rightRes[2] = false;
            }
            return rightRes;
        }
        return null;
    };

    const searchRes = searchBST(root);

    if (!searchRes) {
        return root;
    }

    const [targetNode, parentNode, isLeftBranch] = searchRes;
    const leftBranch = targetNode.left;
    const rightBranch = targetNode.right;

    // handle sub tree first
    if (!rightBranch) { // no right sub tree
        if (!parentNode) { // target node is the root node
            return leftBranch;
        }
        else {
            parentNode[isLeftBranch ? 'left' : 'right'] = leftBranch;
            return root;
        }
    }

    let insertTargetNode = rightBranch;
    while (insertTargetNode.left) {
        insertTargetNode = insertTargetNode.left;
    }
    insertTargetNode.left = leftBranch;

    if (!parentNode) { // target node is the root node
        return rightBranch;
    }

    parentNode[isLeftBranch ? 'left' : 'right'] = rightBranch;
    return root;
};
