

from collections import deque

# time complexity: O(n * n!), space complexity: O(n * n!)
class Solution:
    def permute(self, nums: list[int]) -> list[list[int]]:
        n = len(nums)

        result: deque[list[int]] = deque()
        result.append([nums[0]])

        for i in range(1, n):
            to_insert = nums[i]
            cur_res_len = len(result)

            for j in range(cur_res_len):
                target_list = result[0]
                result.popleft()

                for k in range(len(target_list) + 1):
                    new_list = target_list[:k]
                    new_list.append(to_insert)
                    new_list.extend(target_list[k:])
                    result.append(new_list)

        return list(result)
