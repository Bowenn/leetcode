class Solution:
    def findMin(self, nums: list[int]) -> int:
        n = len(nums)
        if n == 1 or nums[n - 1] >= nums[0]: # same as original array
            return nums[0]

        l = 0
        r = n - 1

        while l <= r:
            mid = (l + r) // 2
            # if nums[mid] == nums[l]:
            if mid == l:
                return min(nums[l], nums[r])
            elif nums[mid] > nums[l]:
                l = mid
            else:
                r = mid

        return nums[r]
