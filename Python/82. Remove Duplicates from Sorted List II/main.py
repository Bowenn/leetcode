# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def deleteDuplicates(self, head: ListNode | None) -> ListNode | None:
        dummy_head = ListNode()
        dummy_head.next = head

        pre_node_to_check = dummy_head
        node_to_check = pre_node_to_check.next

        while node_to_check is not None:
            if node_to_check.next is not None and node_to_check.next.val == node_to_check.val:
                next_to_check = node_to_check.next
                while next_to_check is not None and next_to_check.val == node_to_check.val:
                    next_to_check = next_to_check.next
                pre_node_to_check.next = next_to_check
                node_to_check = next_to_check
            else:
                pre_node_to_check = node_to_check
                node_to_check = pre_node_to_check.next
        
        return dummy_head.next
