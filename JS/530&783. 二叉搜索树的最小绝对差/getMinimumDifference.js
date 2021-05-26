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

/**
  * 递归思路
  */
const getMinimumDifference = function (root) {
    const subMini = node => {
        const [left, l_min, l_max] = node.left ? subMini(node.left) : [Infinity, node.val, -Infinity];
        const [right, r_min, r_max] = node.right ? subMini(node.right) : [Infinity, Infinity, node.val];
        return [
            Math.min(left, right, node.val - l_max, r_min - node.val),
            l_min,
            r_max
        ];
    };

    return subMini(root)[0];
};

/**
  * 中序遍历然后比较差值思路
  */
const getMinimumDifference1 = function (root) {
    const temp = [];

    const inorder = node => {
        if (!node) return;
        inorder(node.left);
        temp.push(node.val);
        inorder(node.right);
    };

    inorder(root);

    return temp.reduce(
        (accumulator, currentValue, index, arr) => {
            return Math.min(accumulator, arr[index] - arr[index - 1] || Infinity);
        },
        Infinity
    );
};
