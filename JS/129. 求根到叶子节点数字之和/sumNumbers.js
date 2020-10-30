/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumNumbers = function(root) {
    if (!root) return 0;

    let total = 0;
    const dfs = (node, cur) => {
        let t = cur * 10 + node.val;
        if (!(node.left || node.right)) {
            // 叶子结点
            total += t;
        }
        else {
            node.left && dfs(node.left, t);
            node.right && dfs(node.right, t);
        }
    };

    dfs(root, 0);
    return total;
};