
from typing import List, Dict

class Solution:
    def minimumDistance(self, nums: List[int]) -> int:
        n = len(nums)
        if n < 3:
            return -1

        res = n
        numDict: Dict[int, List[int]] = {} # num: [last num index, last dis of last two num]

        for i in range(n):
            if nums[i] not in numDict:
                numDict[nums[i]] = [i, -1]
            else:
                if numDict[nums[i]][1] > 0:
                    res = min(res, i - numDict[nums[i]][0] + numDict[nums[i]][1])
                numDict[nums[i]][1] = i - numDict[nums[i]][0]
                numDict[nums[i]][0] = i

        if res == n:
            return -1
        return res * 2
