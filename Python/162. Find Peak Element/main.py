class Solution:
    def findPeakElement(self, nums: list[int]) -> int:
        n = len(nums)
        l = 0
        r = n - 1

        def num_compare(i1: int, i2: int) -> bool:
            if i1 <= -1:
                return True
            if i2 >= n:
                return False
            return nums[i1] < nums[i2]

        while l <= r:
            mid = (l + r) // 2
            left_increasing = num_compare(mid - 1, mid)
            right_increasing = num_compare(mid, mid + 1)

            if left_increasing and not right_increasing: # peak found
                return mid
            elif left_increasing:
                l = mid + 1
            else:
                r = mid - 1
        return -1