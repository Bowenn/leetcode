# Definition for a binary tree node.
from typing import Optional


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
class Solution:
    def getMinimumDifference(self, root: Optional[TreeNode]) -> int:
        if root is None:
            return 0

        cur_min = 100000

        def dfs(node: TreeNode) -> list[int]:
            nonlocal cur_min
            l_smallest = node.val
            l_largest = node.val
            r_smallest = node.val
            r_largest = node.val
            if node.left is not None:
                [l_smallest, l_largest] = dfs(node.left)
                cur_min = min(cur_min, node.val - l_largest)
            if node.right is not None:
                [r_smallest, r_largest] = dfs(node.right)
                cur_min = min(cur_min, r_smallest - node.val)
            
            return [l_smallest, r_largest]
        
        dfs(root)
        return cur_min
