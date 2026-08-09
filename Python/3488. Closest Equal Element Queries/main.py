
from typing import List

class Solution:
    def solveQueries(self, nums: List[int], queries: List[int]) -> List[int]:
        n = len(nums)
        nums += nums
        n2 = n * 2
        minDisMap = [-1 for _ in range(n2)]

        tempDict = {}
        for i in range(n2):
            if nums[i] in tempDict:
                lDis = i - tempDict[nums[i]]
                if lDis != n:
                    minDisMap[i] = min(lDis, n - lDis)
            tempDict[nums[i]] = i

        tempDict = {}
        for i in range(n2 - 1, -1, -1):
            if nums[i] in tempDict:
                rDis = tempDict[nums[i]] - i
                if rDis != n:
                    if minDisMap[i] == -1:
                        minDisMap[i] = min(rDis, n - rDis)
                    else:
                        minDisMap[i] = min(minDisMap[i], rDis, n - rDis)
            tempDict[nums[i]] = i

        m = len(queries)
        res = []
        for i in range(m):
            if minDisMap[queries[i]] == -1:
                res.append(minDisMap[queries[i] + n])
            elif minDisMap[queries[i] + n] == -1:
                res.append(minDisMap[queries[i]])
            else:
                res.append(min(minDisMap[queries[i]], minDisMap[queries[i] + n]))

        return res
