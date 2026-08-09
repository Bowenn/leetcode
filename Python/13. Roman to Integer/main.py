from typing import List

class Solution:
    def majorityElement(self, nums: List[int]) -> int:
        n = len(nums)
        if n <= 2:
            return nums[0]

        l = 1
        r = 2
        while True:
            if nums[l] == nums[l - 1]:
                t = nums[l]
                if r <= l:
                    r = l + 1
                while r < n and nums[r] == nums[l - 1]:
                    r += 1
                if r >= n:
                    return t
                nums[l] = nums[r]
                nums[r] = t
            l += 1
            if l >= n:
                return nums[-1]
