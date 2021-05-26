/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
const rightSideView = function (root) {
    if (!root) return [];
    const res = [];

    const bfs = (arr) => {
        if (arr.length === 0) return;

        const temp = [];
        arr.forEach((item, index) => {
            item.left && temp.push(item.left);
            item.right && temp.push(item.right);
        });
        res.push(arr[arr.length - 1].val);

        bfs(temp);
    };

    bfs([root]);
    return res;
};
