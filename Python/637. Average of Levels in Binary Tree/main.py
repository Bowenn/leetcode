# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
class Solution:
    def averageOfLevels(self, root: TreeNode | None) -> list[float]:
        sum_depth: list[int] = []
        count_depth: list[int] = []

        def dfs(node: TreeNode | None, depth: int):
            if node is None:
                return
            if len(sum_depth) < depth:
                sum_depth.append(node.val)
                count_depth.append(1)
            else:
                sum_depth[depth - 1] += node.val
                count_depth[depth - 1] += 1

            dfs(node.left, depth + 1)
            dfs(node.right, depth + 1)

        dfs(root, 1)

        return [sum_depth[i] / count_depth[i] for i in range(len(sum_depth))]
