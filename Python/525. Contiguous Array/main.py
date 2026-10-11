class Solution:
    def findMaxLength(self, nums: list[int]) -> int:
        max_length = 0
        prefix_sum_map: dict[int, int] = {0: 0}
        p_sum = 0
        for (i, num) in enumerate(nums):
            if num:
                p_sum += 1
            else:
                p_sum -= 1
            if p_sum in prefix_sum_map:
                max_length = max(max_length, i + 1 - prefix_sum_map[p_sum])
            else:
                prefix_sum_map[p_sum] = i + 1

        return max_length
