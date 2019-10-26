/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var bstToGst = function(root) {
    let sum = 0;
    function myFun(root){
        if(root.right != null) myFun(root.right);
        sum += root.val
        root.val = sum;
        if(root.left != null) myFun(root.left);
    }
    myFun(root);
    
    return root;
};