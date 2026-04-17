
from typing import List



class Solution:
    def minMirrorPairDistance(self, nums: List[int]) -> int:
        n = len(nums)
        if n <= 1:
            return -1

        indexDict = {}
        # def calcReverse(x: int) -> int:
        #     res = 0
        #     while x > 0:
        #         t = x // 10
        #         res *= 10
        #         res += x - t * 10
        #         x = t
        #     return res

        # faster in python
        def calcReverse(x: int) -> int:
            return int(str(x)[::-1])

        minDis = -1

        for i in range(n):
            if nums[i] in indexDict:
                if minDis < 0:
                    minDis = i - indexDict[nums[i]]
                else:
                    minDis = min(minDis, i - indexDict[nums[i]])
                indexDict[nums[indexDict[nums[i]]]] = i
            else:
                indexDict[calcReverse(nums[i])] = i

        return minDis
