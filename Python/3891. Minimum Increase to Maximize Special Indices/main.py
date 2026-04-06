from typing import List

class Solution:
    def minIncrease(self, nums: List[int]) -> int:
        n = len(nums)
        isOdd = n & 1
        specialCount = (n - 1) // 2

        if isOdd:
            res = 0
            for i in range(specialCount):
                t = max(nums[i * 2], nums[i * 2 + 2]) + 1
                if nums[i * 2 + 1] < t:
                    res += t - nums[i * 2 + 1]
            return res

        toOperateCounts = [0 for _ in range(n - 2)]
        for i in range(1, n - 1):
            toOperateCounts[i - 1] = max(0, max(nums[i - 1], nums[i + 1]) + 1 - nums[i])

        counts = [0, 0]
        for i in range((n - 2) // 2):
            counts[1] = min(counts[1] + toOperateCounts[i * 2 + 1], counts[0] + toOperateCounts[i * 2 + 1])
            counts[0] += toOperateCounts[i * 2]

        return min(counts[0], counts[1])
