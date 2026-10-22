# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
class Solution:
    def zigzagLevelOrder(self, root: TreeNode | None) -> list[list[int]]:
        if root is None:
            return []

        result: list[list[int]] = []
        to_visit: list[TreeNode] = []
        next_to_visit: list[TreeNode] = [root]
        reverse_flag = False

        while len(next_to_visit) > 0:
            reverse_flag = not reverse_flag
            to_visit = next_to_visit
            next_to_visit = []
            result.append([])

            for i in range(len(to_visit) - 1, -1, -1):
                node = to_visit[i]
                result[-1].append(node.val)
                if reverse_flag:
                    if node.left is not None:
                        next_to_visit.append(node.left)
                    if node.right is not None:
                        next_to_visit.append(node.right)
                else:
                    if node.right is not None:
                        next_to_visit.append(node.right)
                    if node.left is not None:
                        next_to_visit.append(node.left)

        return result
