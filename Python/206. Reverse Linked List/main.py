
from typing import Optional

# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        curNode = None
        newHead = None
        while head is not None:
            curNode = head
            head = head.next
            curNode.next = newHead
            newHead = curNode
        return newHead
