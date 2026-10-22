# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
class Solution:
    def sortedArrayToBST(self, nums: list[int]) -> TreeNode | None:
        def build_tree(l: int, r: int) -> TreeNode | None:
            if l == r:
                return TreeNode(nums[l])
            elif l > r:
                return None
            
            mid = (l + r) // 2
            return TreeNode(nums[mid], build_tree(l, mid - 1), build_tree(mid + 1, r))

        return build_tree(0, len(nums) - 1)
