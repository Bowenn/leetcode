// 1. 横向分层遍历
/*                    0
*            1                2
*        3        4        5        6
*      7   8   9   10  11  12  13  14
*    ......
*/

// method 1

function createTree(nums){
    function TreeNode(val) {
      return {val: val, left: null, right: null};
  }
  
  for(let i in nums) nums[i] = TreeNode(nums[i]);
  
    function ConnectNode(nums, a, n) {
      for(let i=a; i<a+n; i++){
        if(a+n + (i-a)*2< nums.length) nums[i].left = nums[a+n + (i-a)*2];
        if(a+n + (i-a)*2 + 1 < nums.length) nums[i].right = nums[a+n + (i-a)*2 + 1];
    }
    if(a+n+1 > nums.length) return true;
    return ConnectNode(nums, a+n, n*2);
  }
  
  
  nums[0].left = nums[1];
  nums[0].right = nums[2];
  
  ConnectNode(nums, 0, 1);
  
  return nums[0];
}

let nums = [5,3,6,2,4,null,7];
let root = createTree(nums);
console.log(root);