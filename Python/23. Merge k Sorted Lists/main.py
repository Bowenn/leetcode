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