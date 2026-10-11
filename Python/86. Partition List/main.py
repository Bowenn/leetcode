# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
class Solution:
    def partition(self, head: ListNode | None, x: int) -> ListNode | None:
        dummy_head_small = ListNode()
        p_small = dummy_head_small
        dummy_head_large = ListNode()
        p_large = dummy_head_large

        cur_node = head
        while cur_node is not None:
            # next_node = cur_node.next
            if cur_node.val < x:
                p_small.next = cur_node
                p_small = cur_node
            else:
                p_large.next = cur_node
                p_large = cur_node
            cur_node = cur_node.next
        
        p_small.next = dummy_head_large.next
        p_large.next = None

        return dummy_head_small.next
