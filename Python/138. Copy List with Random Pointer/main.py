"""
# Definition for a Node.
class Node:
    def __init__(self, x: int, next: 'Node' = None, random: 'Node' = None):
        self.val = int(x)
        self.next = next
        self.random = random
"""
from __future__ import annotations
from typing import Optional

class Node:
    def __init__(self, x: int, next: Node | None = None, random: Node | None = None):
        self.val = int(x)
        self.next = next
        self.random = random

# O(n) time and O(n) space solution, space can be optimized to O(1) by inserting new nodes in between the original nodes
# current O(n) space is cased by the new_node attribute added to each original node, which also causes a type error
class Solution:
    def copyRandomList(self, head: 'Optional[Node]') -> 'Optional[Node]':
        if head is None:
            return None

        cur_pointer = head
        while cur_pointer is not None:
            new_node = Node(cur_pointer.val)
            cur_pointer.new_node = new_node
            cur_pointer = cur_pointer.next

        cur_pointer = head
        while cur_pointer is not None:
            cur_pointer.new_node.next = cur_pointer.next.new_node if cur_pointer.next is not None else None
            cur_pointer.new_node.random = cur_pointer.random.new_node if cur_pointer.random is not None else None
            cur_pointer = cur_pointer.next

        return head.new_node
