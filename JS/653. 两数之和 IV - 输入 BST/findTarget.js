
// version 1.0
/*
*    Direct search the BST without turn it to an arrayList.
*
*/
let root;

const findTarget = function (root, k) {
    var findNode = function (left, right, k) {
        if (left == null || right == null) return false;
        console.log('K: ' + k + '  L: ' + left.val + '  R: ' + right.val);
        if (left.val + right.val > k) {
            return findNode(left.left, right, k) | findNode(left, right.left, k);
        } else if (left.val + right.val < k) {
            return findNode(left.right, right, k) | findNode(left, right.right, k);
        } else if (left.val === right.val) {
            return findNode(left.left, right.right, k);
        }
        return true;
    };

    return findNode(root, root, k);
};

console.log(findTarget(root, 28));
