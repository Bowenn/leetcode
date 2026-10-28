# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
class Solution:
    def rob(self, root: TreeNode | None) -> int:
        # f(i): rob node[i], g(i): not rob node[i]
        # f(i) = g(i.left) + g(i.right) + i.val
        # g(i) = max(f(i.left), g(i.left)) + max(f(i.right), g(i.right))

        def dfs(node: TreeNode | None) -> tuple[int, int]:
            if node is None:
                return (0, 0)
            
            f_left, g_left = dfs(node.left)
            f_right, g_right = dfs(node.right)
            return (
                g_left + g_right + node.val,
                max(f_left, g_left) + max(f_right, g_right)
            )

        f_root, g_root = dfs(root)
        return max(f_root, g_root)
