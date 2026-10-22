# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
class Solution:
    def kthSmallest(self, root: TreeNode | None, k: int) -> int:
        k_left = k
        target = 0

        def dfs(node: TreeNode | None):
            nonlocal k_left, target

            if node is None or k_left < 0:
                return
            
            dfs(node.left)
            k_left -= 1
            if k_left == 0:
                target = node.val
            dfs(node.right)

        dfs(root)
        return target
