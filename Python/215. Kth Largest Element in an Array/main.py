

import heapq

# quick select, time complexity: O(n), space complexity: O(1)
class Solution:
    def findKthLargest(self, nums: list[int], k: int) -> int:
        n = len(nums)
        target_index = n - k

        l = 0
        r = n - 1

        while l <= r:
            pivot_index = self.partition(nums, l, r)
            if pivot_index == target_index:
                return nums[pivot_index]
            elif pivot_index < target_index:
                l = pivot_index + 1
            else:
                r = pivot_index - 1
        
        return -1

    def partition(self, nums: list[int], l: int, r: int) -> int:
        pivot_value = nums[r]
        i = l - 1

        for j in range(l, r):
            if nums[j] <= pivot_value:
                i += 1
                nums[i], nums[j] = nums[j], nums[i]
        
        i += 1
        nums[i], nums[r] = nums[r], nums[i]

        return i

# time complexity: O(nlogk), space complexity: O(k)
class Solution2:
    def findKthLargest(self, nums: list[int], k: int) -> int:
        return heapq.nlargest(k, nums)[-1]
