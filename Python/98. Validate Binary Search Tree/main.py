# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
class Solution:
    def isValidBST(self, root: TreeNode | None) -> bool:
        def dfs(node: TreeNode | None, min_val: int | None = None, max_val: int | None = None) -> bool:
            if node is None:
                return True
            if ((min_val is not None and node.val <= min_val)
                or (max_val is not None and node.val >= max_val)):
                return False
            if node.left is not None and not dfs(node.left, min_val, node.val):
                return False
            if node.right is not None and not dfs(node.right, node.val, max_val):
                return False
            return True

        return dfs(root)
