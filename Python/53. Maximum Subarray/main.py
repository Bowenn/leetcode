from collections import deque

# time complexity: O(n), space complexity: O(1)
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

# not very efficient, but works
# time complexity: O(n), space complexity: O(n)
class SolutionOld:
    def maxSubarraySumCircular(self, nums: list[int]) -> int:
        n = len(nums)
        max_sub_sum = nums[0]
        temp_sum = 0
        min_prefix_sum: deque[tuple[int, int]] = deque() # (sum, index)
        min_prefix_sum.append((0, -1))

        for i, num in enumerate(nums):
            temp_sum += num
            # print(temp_sum, min_prefix_sum)
            max_sub_sum = max(max_sub_sum, temp_sum - min_prefix_sum[0][0])
            while len(min_prefix_sum) > 0 and temp_sum <= min_prefix_sum[-1][0]:
                min_prefix_sum.pop()
            min_prefix_sum.append((temp_sum, i))
        
        for i, num in enumerate(nums):
            temp_sum += num
            while len(min_prefix_sum) > 0 and min_prefix_sum[0][1] < i:
                min_prefix_sum.popleft()
            # print(temp_sum, min_prefix_sum)
            max_sub_sum = max(max_sub_sum, temp_sum - min_prefix_sum[0][0])
            while len(min_prefix_sum) > 0 and temp_sum <= min_prefix_sum[-1][0]:
                min_prefix_sum.pop()
            min_prefix_sum.append((temp_sum, i + n))

        return max_sub_sum