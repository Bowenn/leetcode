
from typing import List



class Solution:
    def firstMissingPositive(self, nums: List[int]) -> int:
        n = len(nums)
        for i in range(n):
            t = i
            while nums[t] != t + 1:
                if nums[t] <= 0 or nums[t] > n:
                    nums[t] = 0
                    break
                else:
                    t2Swap = nums[nums[t] - 1]
                    if t2Swap == nums[t]:
                        nums[t] = 0
                        break
                    else:
                        nums[nums[t] - 1] = nums[t]
                        nums[t] = t2Swap

        for i in range(n):
            if nums[i] != i + 1:
                return i + 1
        return n + 1
