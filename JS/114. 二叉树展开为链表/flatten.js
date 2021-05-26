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
 * @return {void} Do not return anything, modify root in-place instead.
 */
const flatten = function (root) {
    let p = root;
    let p_to = null;
    while (p) {
        // 判断是否需要迁移右分杈
        if (p.right && p.left) {
            // 找到分杈接入的目标
            p_to = p.left;
            while (p_to.right || p_to.left) {
                p_to = p_to.right || p_to.left;
            }
            // 分杈迁移
            p_to.right = p.right;
            p.right = null;
        }

        if (p.left) {
            // 左分杈移到右分杈上
            p.right = p.left;
            p.left = null;
        }
        p = p.right;
    }
};
