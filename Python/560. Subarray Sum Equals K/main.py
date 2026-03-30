from typing import *

class Solution:
    def subarraySum(self, nums: List[int], k: int) -> int:
        n = len(nums)
        sums: List[int] = [0 for _ in range(n + 1)]

        temp = 0
        for i in range(n):
            temp += nums[i]
            sums[i + 1] = temp
        
        d = {}

        res = 0

        for s in sums:
            if s in d:
                res += d[s]
            
            if (s + k) in d:
                d[s + k] += 1
            else:
                d[s + k] = 1
        
        return res
                

if __name__ == "__main__":
    s = Solution()
    print(s.subarraySum([1, 1, 1], 2))