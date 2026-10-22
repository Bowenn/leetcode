import heapq

class Solution:
    def findMaximizedCapital(self, k: int, w: int, profits: list[int], capital: list[int]) -> int:
        n = len(profits)
        capital_index_sorted = [i for i in range(n)]
        capital_index_sorted.sort(key=lambda x: capital[x])

        max_heap: list[int] = []
        offset = 0
        cur_w = w
        for i in range(k):
            while offset < n and capital[capital_index_sorted[offset]] <= cur_w:
                # pp = profits[capital_index_sorted[offset]] - capital[capital_index_sorted[offset]]
                heapq.heappush_max(max_heap, (profits[capital_index_sorted[offset]], capital_index_sorted[offset]))
                offset += 1
            if len(max_heap) == 0:
                return cur_w
            cur_w += heapq.heappop_max(max_heap)[0]
        return cur_w
