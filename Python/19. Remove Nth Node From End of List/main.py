# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
class Solution:
    def removeNthFromEnd(self, head: ListNode | None, n: int) -> ListNode | None:
        dummy_head = ListNode()
        dummy_head.next = head

        iter_node = dummy_head
        for i in range(n):
            iter_node = iter_node.next
        prev_remove = dummy_head

        while iter_node.next is not None:
            iter_node = iter_node.next
            prev_remove = prev_remove.next

        to_remove = prev_remove.next
        next_node = to_remove.next
        prev_remove.next = next_node

        return dummy_head.next
