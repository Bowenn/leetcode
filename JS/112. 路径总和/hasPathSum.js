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
 * @return {boolean}
 */

/* My Solution 加 */
var hasPathSum = function (root, sum) {
    let hasSum = (node, cur) => {
        if (!node) return false;
        let t = node.val + cur;
        if (node.left || node.right) {
            // 非叶子节点
            return hasSum(node.left, t)
                || hasSum(node.right, t);
        }
        else {
            // 是叶子节点
            return t === sum;
        }
    }
    return hasSum(root, 0);
};


/* Another Solution 减 */
var hasPathSum = function(root, sum) {
    if (!root) return false;
    
    let t = sum - root.val;
        if (root.left || root.right) {
            // 非叶子节点
            return hasPathSum(root.left, t) 
                    || hasPathSum(root.right, t);
        }
        else {
            // 是叶子节点
            return t === 0;
        }
};