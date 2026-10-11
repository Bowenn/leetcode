# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
class Solution:
    def rotateRight(self, head: ListNode | None, k: int) -> ListNode | None:
        if head is None or head.next is None:
            return head

        cur_node = head
        count = 1
        # iterate through link list to get the length
        while cur_node.next is not None:
            cur_node = cur_node.next
            count += 1

        # link tail to the head
        cur_node.next = head
        
        # find new tail
        k = k % count
        for i in range(count - k):
            cur_node = cur_node.next
        
        # get new head and break the circle
        new_head = cur_node.next
        cur_node.next = None

        return new_head
