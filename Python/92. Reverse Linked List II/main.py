# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
class Solution:
    def reverseBetween(self, head: ListNode | None, left: int, right: int) -> ListNode | None:
        dummy_head = ListNode()
        dummy_head.next = head
        
        cur_node: ListNode | None = dummy_head
        for i in range(1, left):
            cur_node = cur_node.next
        # print(cur_node.val)

        front_part_tail = cur_node
        cur_node = cur_node.next
        middle_part_tail = cur_node
        middle_part_head = None

        for i in range(left, right + 1):
            next_node = cur_node.next
            cur_node.next = middle_part_head
            middle_part_head = cur_node
            cur_node = next_node
        
        back_part_head = cur_node

        front_part_tail.next = middle_part_head
        middle_part_tail.next = back_part_head

        # print(front_part_tail.val, middle_part_head.val, middle_part_tail.val, back_part_head.val)

        return dummy_head.next
