from typing import List

class Solution(object):
    def trap(self, height: List[int]) -> int:
        """
        :type height: List[int]
        :rtype: int
        """
        res = 0
        l = 0
        r = len(height) - 1
        h = min(height[l], height[r])

        while l < r:
            if height[l] < height[r]:
                l += 1
                if height[l] < h:
                    res += h - height[l]
                elif height[l] < height[r]:
                    h = height[l]
                else:
                    h = height[r]
            else:
                r -= 1
                if height[r] < h:
                    res += h - height[r]
                elif height[r] < height[l]:
                    h = height[r]
                else:
                    h = height[l]
        
        return res
