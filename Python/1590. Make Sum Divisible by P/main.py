class Solution:
    def minSubarray(self, nums: list[int], p: int) -> int:
        n = len(nums)
        total_sum = 0
        for num in nums:
            total_sum += num
        target = total_sum % p

        if target == 0:
            return 0

        # 2 sum method
        sub_target_map: dict[int, int] = dict() # sub_target: index
        sub_target_map[target] = -1
        prefix_sum = 0
        min_length = n
        for i in range(n):
            prefix_sum += nums[i]
            mod_p = prefix_sum % p
            if mod_p in sub_target_map:
                min_length = min(min_length, i - sub_target_map[mod_p])

            # (sub_target - mod_p + p) % p = target
            # sub_target = (target + mod_p) % p
            sub_target_map[(target + mod_p) % p] = i
        
        if min_length < n:
            return min_length
        return -1
