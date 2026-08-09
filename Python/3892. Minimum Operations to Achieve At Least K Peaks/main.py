from typing import List

class Solution:
    def minOperations(self, nums: list[int], k: int) -> int:
        n = len(nums)
        isOdd = n & 1
        maxPeakCounts = n // 2

        if k > maxPeakCounts:
            return -1

        costs = [0 for _ in range(n)]
        costs[0] = max(0, max(nums[1], nums[-1]) + 1 - nums[0])
        costs[-1] = max(0, max(nums[0], nums[-2]) + 1 - nums[-1])
        for i in range(1, n - 1):
            costs[i] = max(0, max(nums[i + 1], nums[i - 1 ]) + 1 - nums[i])

        # print(costs)

        def calcMinCosts(costsList: List[int], k: int):
            maxPeakCounts = (len(costsList) + 1 )// 2
            skipCounts = maxPeakCounts - k
            
            counts = [[0, 0] for _ in range(skipCounts + 1)]
            for i in range(len(costsList) // 2):
                for j in range(skipCounts, 0, -1):
                    counts[j][1] = min(counts[j][1] + costsList[i * 2 + 1], counts[j - 1][1], counts[j][0] + costsList[i * 2 + 1], counts[j - 1][0])
                    counts[j][0] = min(counts[j][0] + costsList[i * 2], counts[j - 1][0], counts[j - 1][1])
                counts[0][1] = min(counts[0][1] + costsList[i * 2 + 1], counts[0][0] + costsList[i * 2 + 1])
                counts[0][0] = counts[0][0] + costsList[i * 2]
            # print(counts)
            if len(costsList) & 1:
                if skipCounts > 0:
                    return min(counts[-1][0] + costsList[-1], counts[-2][0], counts[-2][1])
                return counts[-1][0] + costsList[-1]
            else:
                return min(counts[-1][0], counts[-1][1])
            

        return min(
            calcMinCosts(costs[1:], k), # with first el
            calcMinCosts(costs[:-1], k) # without first el
        )
