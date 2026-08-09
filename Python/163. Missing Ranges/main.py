
from typing import List

class Solution:
    def findMissingRanges(self, nums: List[int], lower: int, upper: int) -> List[List[int]]:
        l = lower - 1
        res = []
        for i in nums:
            if i > upper:
                break
            if i > l:
                if i > l + 1:
                    res.append([l + 1, i - 1])
                l = i
        if l < upper:
            res.append([l + 1, upper])
        return res
