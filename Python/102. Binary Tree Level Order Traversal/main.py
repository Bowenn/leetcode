# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
class Solution:
    def levelOrder(self, root: TreeNode | None) -> list[list[int]]:
        if root is None:
            return []
        result: list[list[int]] = []
        to_visit: list[TreeNode] = []
        next_to_visit: list[TreeNode] = [root]

        while len(next_to_visit) > 0:
            to_visit = next_to_visit
            result.append([])
            next_to_visit = []
            for node in to_visit:
                result[-1].append(node.val)
                if node.left is not None:
                    next_to_visit.append(node.left)
                if node.right is not None:
                    next_to_visit.append(node.right)

        return result
