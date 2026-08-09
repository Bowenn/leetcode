
from typing import List


class Solution:
    def getMinDistance(self, nums: List[int], target: int, start: int) -> int:
        n = len(nums)
        i = 0
        limit = max(n - 1 - start, start)
        while i <= limit:
            if start + i < n and nums[start + i] == target:
                return i
            if start >= i and nums[start - i] == target:
                return i
            i += 1
        return -1