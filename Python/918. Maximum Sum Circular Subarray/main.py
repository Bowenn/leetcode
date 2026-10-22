# time: O(n), space: O(1)
# Kadane's algorithm, with a twist to handle circular subarray
# Edge case is easy to miss, be careful
class Solution:
    def maxSubarraySumCircular(self, nums: list[int]) -> int:
        n = len(nums)
        max_sub_sum = nums[0]
        min_sub_sum = nums[0]
        temp_sum = 0
        max_prefix_sum = 0
        min_prefix_sum = 0

        for num in nums:
            temp_sum += num
            max_sub_sum = max(max_sub_sum, temp_sum - min_prefix_sum)
            min_sub_sum = min(min_sub_sum, temp_sum - max_prefix_sum)

            max_prefix_sum = max(max_prefix_sum, temp_sum)
            min_prefix_sum = min(min_prefix_sum, temp_sum)
            # print(temp_sum, max_prefix_sum, min_prefix_sum, max_sub_sum, min_sub_sum)

        # Edge Case: If all numbers are negative, max_sum will be negative (< 0)
        # and min_sum will equal total_sum (making total_sum - min_sum == 0, which represents an invalid empty subarray).
        if max_sub_sum < 0:
            return max_sub_sum
        return max(max_sub_sum, temp_sum - min_sub_sum)
