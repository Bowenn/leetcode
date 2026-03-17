from typing import Dict, List

class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        map: Dict[int, int] = {}
        for i, n in enumerate(nums):
            if n in map:
                return [map[n], i]
            map[target - n] = i
        return [-1, -1]