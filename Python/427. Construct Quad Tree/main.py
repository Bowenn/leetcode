"""
# Definition for a QuadTree node.
class Node:
    def __init__(self, val, isLeaf, topLeft, topRight, bottomLeft, bottomRight):
        self.val = val
        self.isLeaf = isLeaf
        self.topLeft = topLeft
        self.topRight = topRight
        self.bottomLeft = bottomLeft
        self.bottomRight = bottomRight
"""

class Node:
    def __init__(self, val, isLeaf, topLeft, topRight, bottomLeft, bottomRight):
        self.val = val
        self.isLeaf = isLeaf
        self.topLeft = topLeft
        self.topRight = topRight
        self.bottomLeft = bottomLeft
        self.bottomRight = bottomRight

class Solution:
    def construct(self, grid: list[list[int]]) -> 'Node':
        def construct_grid(top: int, left: int, a: int) -> Node:
            if a == 1:
                return Node(grid[top][left], True, None, None, None, None)
            smaller_a = a // 2
            topLeft = construct_grid(top, left, smaller_a)
            topRight = construct_grid(top, left + smaller_a, smaller_a)
            bottomLeft = construct_grid(top + smaller_a, left, smaller_a)
            bottomRight = construct_grid(top + smaller_a, left + smaller_a, smaller_a)

            if (topLeft.isLeaf and topRight.isLeaf and bottomLeft.isLeaf and bottomRight.isLeaf
                and topLeft.val == topRight.val and topLeft.val == bottomLeft.val and topLeft.val == bottomRight.val):
                return Node(topLeft.val, True, None, None, None, None)

            return Node(1, False, topLeft, topRight, bottomLeft, bottomRight)

        return construct_grid(0, 0, len(grid))
