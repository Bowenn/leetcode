
from typing import List, Tuple


class Solution:
    def fourSum(self, nums: List[int], target: int) -> List[List[int]]:
        n = len(nums)
        if n < 4:
            return []
        nums.sort()
        if nums[0] + nums[1] + nums[2] + nums[3] > target or nums[-1] + nums[-2] + nums[-3] + nums[-4] < target:
            return []

        res: Set[Tuple[int, int, int, int]] = set()

        sumCache = [[0 for _ in range(n)] for _ in range(n)]
        l1 = 0
        r1 = n - 1

        for l1 in range(n - 3):
            for r1 in range(n - 1, l1 + 2, -1):
                l2 = l1 + 1
                r2 = r1 - 1
                if sumCache[l1][r1] == 0:
                    sumCache[l1][r1] = nums[l1] + nums[r1]
                subTarget = target - sumCache[l1][r1]
                
                while l2 < r2:
                    if sumCache[l2][r2] == 0:
                        sumCache[l2][r2] = nums[l2] + nums[r2]
                    if sumCache[l2][r2] > subTarget:
                        r2 -= 1
                    elif sumCache[l2][r2] < subTarget:
                        l2 += 1
                    else:
                        res.add((nums[l1], nums[l2], nums[r2], nums[r1]))
                        r2 -= 1
                        l2 += 1

        return list(res)
