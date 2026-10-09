
from collections import deque


class Solution:
    def maxSlidingWindow(self, nums: list[int], k: int) -> list[int]:
        n = len(nums)
        result: list[int] = []
        number_list: deque[list[int]] = deque() # [[num, index]]

        # l -> r
        for i in range(n):
            if len(number_list) != 0 and number_list[0][1] <= i - k:
                number_list.popleft()
            while len(number_list) != 0 and number_list[-1][0] < nums[i]:
                number_list.pop()
            number_list.append([nums[i], i])

            if i - k + 1 >= 0:
                result.append(number_list[0][0])

        return result

