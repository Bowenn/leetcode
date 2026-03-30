from typing import Optional

# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        root = ListNode()
        n1 = list1
        n2 = list2
        cur = root
        while n1 and n2:
            if n1.val > n2.val:
                cur.next = ListNode(n2.val)
                n2 = n2.next
            else:
                cur.next = ListNode(n1.val)
                n1 = n1.next
            cur = cur.next

        while n1:
            cur.next = ListNode(n1.val)
            n1 = n1.next
            cur = cur.next

        while n2:
            cur.next = ListNode(n2.val)
            n2 = n2.next
            cur = cur.next

        return root.next
