/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number[][]}
 */
var pathSum = function(root, sum) {
    let hasSum = (node, cur, path) => {
        if (!node) return [];
        let path_t = path.concat(node.val); // 当前路径
        let val_t = node.val + cur; // 当前路径数值和
        if (node.left || node.right) {
            // 非叶子节点
            return hasSum(node.left, val_t, path_t).concat(hasSum(node.right, val_t, path_t));
        }
        else {
            // 是叶子节点
            if (val_t === sum) {
                return [path_t]
            }
            else {
                return [];
            }
        }
    }
    return hasSum(root, 0, []);
};