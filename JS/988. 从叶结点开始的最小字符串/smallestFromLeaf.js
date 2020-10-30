/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {string}
 */
var smallestFromLeaf = function(root) {
    if (!root) return "";

    let res = [], l = 0;
    let cur = [], length = 0;
    const backtrack = (node) => {
        cur.unshift(node.val);
        length++;
        if (!(node.left || node.right)) {
            // 叶子结点
            if (l === 0) {
                // 当前没有最小字符串
                res = cur.concat();
                l = res.length;
            }
            else {
                // 与当前最小字符串比较
                let i;
                for (i = 0; i < l; i++) {
                    if (i >= length) {
                        // 更新最小字符串
                        res = cur.concat();
                        l = res.length;
                        break;
                    }
                    else if (cur[i] === res[i]) {
                        // 比较下一位
                        continue;
                    }
                    else if (cur[i] < res[i]) {
                        // 更新最小字符串
                        res = cur.concat();
                        l = res.length;
                        break;
                    }
                    else {
                        // 舍弃
                        break;
                    }
                }
            }
        }
        else {
            node.left && backtrack(node.left);
            node.right && backtrack(node.right);
        }
        cur.shift();
        length--;
    };

    backtrack(root);
    console.log(res);
    return res.reduce((all, cur) => {
        return all + String.fromCharCode(cur + 97);
    },
    '');
};