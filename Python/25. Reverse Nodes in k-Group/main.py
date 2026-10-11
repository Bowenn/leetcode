# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def reverseKGroup(self, head: ListNode | None, k: int) -> ListNode | None:
        if k <= 1:
            return head
        
        def reverse_part(part_head: ListNode | None, k: int):
            part_tail_node = part_head

            part_head_node = None
            cur_node = part_head

            for i in range(k):
                next_node = cur_node.next
                cur_node.next = part_head_node
                part_head_node = cur_node
                cur_node = next_node
            
            return [part_head_node, part_tail_node]

        dummy_head = ListNode()
        result_tail = dummy_head

        to_reverse_head = head
        next_to_reverse_head = to_reverse_head

        while True:
            for i in range(k):
                if next_to_reverse_head is None:
                    break
                next_to_reverse_head = next_to_reverse_head.next
            
            else:
                [new_part_head, new_part_tail] = reverse_part(to_reverse_head, k)
                result_tail.next = new_part_head
                result_tail = new_part_tail
                to_reverse_head = next_to_reverse_head
                continue
            
            break
        
        result_tail.next = to_reverse_head

        return dummy_head.next
