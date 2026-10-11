# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
class Solution:
    def flatten(self, root: TreeNode | None) -> None:
        """
        Do not return anything, modify root in-place instead.
        """
        if root is None:
            return None
        left_part = self.flatten(root.left)
        right_part = self.flatten(root.right)

        root.left = None
        root.right = left_part
        cur_node = root
        while cur_node.right is not None:
            cur_node = cur_node.right
        cur_node.right = right_part

        return root
