# Definition for singly-linked list.
from typing import Optional


class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        fast_p = head
        slow_p = head

        while fast_p is not None and slow_p is not None:
            fast_p = fast_p.next
            if fast_p is None:
                break
            fast_p = fast_p.next
            slow_p = slow_p.next

            if fast_p is slow_p:
                return True

        return False
