class Solution:
    def maxSubArray(self, nums: list[int]) -> int:
        max_sub_sum = nums[0]
        min_prefix_sum = 0
        temp_sum = 0

        for num in nums:
            temp_sum += num
            max_sub_sum = max(max_sub_sum, temp_sum - min_prefix_sum)
            if temp_sum < min_prefix_sum:
                min_prefix_sum = temp_sum
        
        return max_sub_sum
