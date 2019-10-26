/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @param {number} target
 * @return {boolean}
 */
var twoSumBSTs = function(root1, root2, target) {
    let array1 = new Set();
    let array2 = new Set();
    function TreeToArray(root, array){
        return function(){
            if(root.left != null)	TreeToArray(root.left, array);
            array.add(root.val)
            if(root.right != null)	TreeToArray(root.right, array);
        }();
    }
    TreeToArray(root1, array1);
    TreeToArray(root2, array2);

    
    for(let a of array1){
        if (array2.has(target - a)) return true;
    }
    return false;
    
};