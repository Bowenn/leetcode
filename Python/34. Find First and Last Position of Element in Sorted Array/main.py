class Solution:
    def searchRange(self, nums: list[int], target: int) -> list[int]:
        n = len(nums)
        less_index = -1
        larger_index = n
        l = 0
        r = n - 1

        # search less index first
        while l <= r:
            mid = (l + r) // 2
            if nums[mid] >= target:
                r = mid - 1
            else:
                l = mid + 1
        
        less_index = r

        # search larger index then
        l = max(0, less_index)
        r = n - 1
        while l <= r:
            mid = (l + r) // 2
            if nums[mid] > target:
                r = mid - 1
            else:
                l = mid + 1
        
        larger_index = l

        if larger_index - less_index == 1:
            return [-1, -1]
        return [less_index + 1, larger_index - 1]
