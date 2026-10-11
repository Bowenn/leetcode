# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
class Solution:
    def buildTree(self, inorder: list[int], postorder: list[int]) -> TreeNode | None:

        # hash map to get O(1) time
        inorder_map: dict[int, int] = {}
        for (i, num) in enumerate(inorder):
            inorder_map[num] = i

        def build_sub_tree(root_index_postorder: int, l_index_inorder: int, r_index_inorder: int):
            if l_index_inorder > r_index_inorder:
                return None
            root_node = TreeNode(postorder[root_index_postorder])
            root_index_inorder = inorder_map[postorder[root_index_postorder]]
            right_node_count = r_index_inorder - root_index_inorder

            root_node.right = build_sub_tree(root_index_postorder - 1, root_index_inorder + 1, r_index_inorder)
            root_node.left = build_sub_tree(root_index_postorder - 1 - right_node_count, l_index_inorder, root_index_inorder - 1)

            return root_node
        
        return build_sub_tree(len(postorder) - 1, 0, len(inorder) - 1)
