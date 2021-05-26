/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 * @description 递归子树的方法
 */
const maxPathSum1 = function (root) {
    const subTreeMaxSum = (node) => {
        if (!node) return [-Infinity, -Infinity]; // [该子树任意路径的最大和，从树根起始向下单条路径的最大和]
        const [left_any, left_node] = subTreeMaxSum(node.left);
        const [right_any, right_node] = subTreeMaxSum(node.right);

        const max_node = Math.max(node.val, node.val + left_node, node.val + right_node);

        let t = node.val;
        left_node > 0 && (t += left_node);
        right_node > 0 && (t += right_node);
        const max_any = Math.max(left_any, right_any, t);
        return [max_any, max_node];
    };

    const [max] = subTreeMaxSum(root);
    return max;
};
