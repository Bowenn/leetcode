# Definition for singly-linked list.
from typing import List, Optional, Tuple
import heapq
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        k = len(lists)
        if k == 0:
            return None
        elif k == 1:
            return lists[0]

        new_head = ListNode()
        cur_p = new_head

        p_queue: List[Tuple[int, int, ListNode]] = []
        for i in range(k):
            node = lists[i]
            if node is not None:
                heapq.heappush(p_queue, (node.val, i, node))

        while p_queue:
            (v, i, node) = heapq.heappop(p_queue)
            cur_p.next = node
            cur_p = cur_p.next
            if node.next:
                heapq.heappush(p_queue, (node.next.val, i, node.next))
        
        return new_head.next
    

# Another Solution: Divide and Conquer
class AnotherSolution:
    def merge2Lists(self, list_a: ListNode | None, list_b: ListNode | None) -> ListNode | None:
        if list_a is None:
            return list_b
        elif list_b is None:
            return list_a

        new_head = ListNode()
        cur = new_head
        while True:
            assert list_a is not None and list_b is not None
            if list_a.val > list_b.val:
                cur.next = list_b
                cur = cur.next
                if list_b.next is None:
                    cur.next = list_a
                    return new_head.next
                list_b = list_b.next

            else:
                cur.next = list_a
                cur = cur.next
                if list_a.next is None:
                    cur.next = list_b
                    return new_head.next
                list_a = list_a.next

    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        k = len(lists)
        if k == 0:
            return None
        elif k == 1:
            return lists[0]

        while k > 1:
            offset = 0
            while (offset + 1) * 2 <= k:
                lists[offset] = self.merge2Lists(lists[offset], lists.pop())
                offset += 1
            k = len(lists)
        
        return lists[0]
