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

function maxLevelSum(root: TreeNode | null): number {
    if (!root) {
        return 0;
    }

    const depthSum: number[] = [];
    const dfs = (node: TreeNode, depth: number = 1) => {
        if (depth > depthSum.length) {
            depthSum.push(node.val);
        }
        else {
            depthSum[depth - 1] += node.val;
        }

        node.left && dfs(node.left, depth + 1);
        node.right && dfs(node.right, depth + 1);
    };

    dfs(root);

    let maxSum = depthSum[0];
    let maxSumIndex = 0;
    for (let i = 1; i < depthSum.length; i++) {
        if (depthSum[i] > maxSum) {
            maxSum = depthSum[i];
            maxSumIndex = i;
        }
    }

    return maxSumIndex + 1;
};

// bfs method
function maxLevelSumBFS(root: TreeNode | null): number {
    if (!root) {
        return 0;
    }

    const toVisitNodes: TreeNode[] = [root];
    let visitedIndex = -1;
    let curDepth = 0;
    let curMaxSum = root.val;
    let curMaxSumDepth = 1;

    while (visitedIndex < toVisitNodes.length - 1) {
        const tailIndex = toVisitNodes.length - 1;
        let tempSum = 0;
        curDepth++;
        for (let i = visitedIndex + 1; i <= tailIndex; i++) {
            tempSum += toVisitNodes[i].val;
            toVisitNodes[i].left && toVisitNodes.push(toVisitNodes[i].left!);
            toVisitNodes[i].right && toVisitNodes.push(toVisitNodes[i].right!);
        }
        if (tempSum > curMaxSum) {
            curMaxSum = tempSum;
            curMaxSumDepth = curDepth;
        }
        visitedIndex = tailIndex;
    }

    return curMaxSumDepth;
};
