from typing import *

# Definition for a binary tree node.
class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        stack: List['TreeNode'] = []

        found_p = False
        found_q = False

        depth_ancestor = 0

        res: Optional['TreeNode'] = None

        def dfs(node: 'TreeNode'):
            nonlocal found_p, found_q, depth_ancestor, res, stack
            if found_p and found_q or node == None:
                return

            stack.append(node)
            if node.val == p.val:
                found_p = True
                if not found_q:
                    depth_ancestor = len(stack)
                else:
                    res = stack[depth_ancestor - 1]
                    return
            if node.val == q.val:
                found_q = True
                if not found_p:
                    depth_ancestor = len(stack)
                else:
                    res = stack[depth_ancestor - 1]
                    return

            if node.left:
                dfs(node.left)
            if node.right:
                dfs(node.right)

            stack.pop()
            if depth_ancestor > 0 and len(stack) < depth_ancestor:
                depth_ancestor = len(stack)
        
        dfs(root)

        assert res is not None
        return res


class Solution2:
    def lowestCommonAncestor(self, root: Optional['TreeNode'], p: 'TreeNode', q: 'TreeNode') -> Optional['TreeNode']:
        if root in (None, p, q): return root
         # Recursively search for p and q in the left subtree
        left_result = self.lowestCommonAncestor(root.left, p, q)
      
        # Recursively search for p and q in the right subtree
        right_result = self.lowestCommonAncestor(root.right, p, q)

        if left_result and right_result: return root
        else: return left_result or right_result