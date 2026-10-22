
import heapq

# time: O(klog(min(n, k))), space: O(min(n, k))
class Solution:
    def kSmallestPairs(self, nums1: list[int], nums2: list[int], k: int) -> list[list[int]]:
        m = len(nums1)
        n = len(nums2)
        
        result = []
        min_heap: list[tuple[int, int, int]] = [] # (sum, i in nums1, i in nums2)

        for j in range(min(n, k)):
            heapq.heappush(min_heap, (nums1[0] + nums2[j], 0, j))

        while len(result) < k:
            min_i = min_heap[0][1]
            min_j = min_heap[0][2]
            result.append([nums1[min_i], nums2[min_j]])
            if min_i + 1 < m:
                heapq.heapreplace(min_heap, (nums1[min_i + 1] + nums2[min_j], min_i + 1, min_j))
            else:
                heapq.heappop(min_heap)

        return result
        

# time: O(m*n*log(k)), space: O(k)
class SolutionWorse:
    def kSmallestPairs(self, nums1: list[int], nums2: list[int], k: int) -> list[list[int]]:
        m = len(nums1)
        n = len(nums2)
        
        max_heap: list[tuple[int, int, int]] = [] # (sum, i in nums1, i in nums2)

        for i in range(m):
            for j in range(n):
                pair_sum = nums1[i] + nums2[j]
                # print(max_heap, pair_sum, i, j)
                if len(max_heap) < k:
                    heapq.heappush_max(max_heap, (pair_sum, i, j))
                elif pair_sum < max_heap[0][0]:
                    heapq.heapreplace_max(max_heap, (pair_sum, i, j))
                else:
                    break
        
        result = [[] for _ in range(k)]
        for i in range(k - 1, -1, -1):
            _, x, y = heapq.heappop_max(max_heap)
            result[i] = [nums1[x], nums2[y]]

        return result
        
