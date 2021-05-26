/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
const connect = function (root) {
    if (!root) return root;

    const bfs = (arr) => {
        if (arr.length === 0) return;

        const temp = [];
        arr.forEach((item, index) => {
            item.next = arr[index + 1] ? arr[index + 1] : null;
            item.left && temp.push(item.left);
            item.right && temp.push(item.right);
        });

        bfs(temp);
    };

    bfs([root]);
    return root;
};
