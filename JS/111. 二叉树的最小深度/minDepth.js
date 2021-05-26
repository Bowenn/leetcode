/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/* My solution: BFS */
const minDepth = function (root) {
    // root为null单独判断直接返回
    if (!root) return 0;

    // bfs广度优先搜索
    function bfsTree (nodes, deep) {
        const subNodes = []; // 存储当前深度节点子节点的数组
        // 遍历当前深度节点
        for (const node of nodes) {
            const a = node.left && subNodes.push(node.left);
            const b = node.right && subNodes.push(node.right);
            if (!a && !b) {
                // 无子节点，返回最小深度
                return deep;
            }
        }
        // 全都有子节点，在下一深度继续搜索
        return bfsTree(subNodes, ++deep);
    }
    return bfsTree([root], 1);
};

/* Another solution */
// 直接递归，整个树的最小 => 子树的最小，很精致的思路
const minDepth2 = function (root) {
    if (root === null) return 0;
    if (root.left === null) return minDepth(root.right) + 1;
    if (root.right === null) return minDepth(root.left) + 1;
    return Math.min(minDepth(root.left), minDepth(root.right)) + 1;
};
