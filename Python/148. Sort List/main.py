# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

# top-down merge sort, time: O(nlogn), space: O(logn)
class Solution:
    def sortList(self, head: ListNode | None) -> ListNode | None:
        
        def merge_sort(head: ListNode | None) -> ListNode | None:
            if head is None:
                return None
            if head.next is None:
                return head

            p1 = head
            last_p1 = None
            p2 = head

            while p2 is not None and p2.next is not None:
                last_p1 = p1
                p1 = p1.next
                p2 = p2.next
                p2 = p2.next

            last_p1.next = None
            sub_head1 = merge_sort(head)
            sub_head2 = merge_sort(p1)

            dummy_head = ListNode(-100000)
            cur_tail = dummy_head

            while sub_head1 is not None and sub_head2 is not None:
                if sub_head1.val < sub_head2.val:
                    cur_tail.next = sub_head1
                    cur_tail = cur_tail.next
                    sub_head1 = sub_head1.next
                else:
                    cur_tail.next = sub_head2
                    cur_tail = cur_tail.next
                    sub_head2 = sub_head2.next
            
            if sub_head1 is not None:
                cur_tail.next = sub_head1

            if sub_head2 is not None:
                cur_tail.next = sub_head2
            
            return dummy_head.next

        return merge_sort(head)

# bottom-up merge sort, time: O(nlogn), space: O(1)
class SolutionBetter:
    def sortList(self, head: ListNode | None) -> ListNode | None:
        if not head or not head.next:
            return head

        # 1. Count the total length of the linked list
        length = 0
        curr = head
        while curr:
            length += 1
            curr = curr.next

        dummy = ListNode(0, head)

        # Helper 1: Cut off `step` nodes starting from `start_node`,
        # and return the head of the remaining list.
        def split(start_node: ListNode | None, step: int) -> ListNode | None:
            if not start_node:
                return None
            for _ in range(step - 1):
                if not start_node.next:
                    break
                start_node = start_node.next
            
            rest = start_node.next
            start_node.next = None  # Sever the sublist
            return rest

        # Helper 2: Merge `l1` and `l2`, attach to `prev_tail`,
        # and return the tail of the newly merged list.
        def merge(l1: ListNode | None, l2: ListNode | None, prev_tail: ListNode) -> ListNode:
            curr_tail = prev_tail
            while l1 and l2:
                if l1.val < l2.val:
                    curr_tail.next = l1
                    l1 = l1.next
                else:
                    curr_tail.next = l2
                    l2 = l2.next
                curr_tail = curr_tail.next

            curr_tail.next = l1 if l1 else l2
            
            # Advance `curr_tail` to the very end of the merged segment
            while curr_tail.next:
                curr_tail = curr_tail.next
                
            return curr_tail

        # 2. Bottom-up merge: step = 1, 2, 4, 8, ...
        step = 1
        while step < length:
            prev_tail = dummy
            curr = dummy.next

            while curr:
                # Carve out two sublists of size `step`
                sub_head1 = curr
                sub_head2 = split(sub_head1, step)
                curr = split(sub_head2, step)  # `curr` now points to the start of the next pair

                # Merge the two sublists and attach them to `prev_tail`
                prev_tail = merge(sub_head1, sub_head2, prev_tail)

            step *= 2

        return dummy.next