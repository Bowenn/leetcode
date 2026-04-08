from typing import List

LIMIT = pow(10, 9) + 7

class Solution:
    def xorAfterQueries(self, nums: List[int], queries: List[List[int]]) -> int:
        for query in queries:
            for i in range(query[0], query[1] + 1, query[2]):
                nums[i] *= query[3]
                if nums[i] >= LIMIT:
                    nums[i] = nums[i] % LIMIT

        res = 0
        for n in nums:
            res ^= n
        
        return res