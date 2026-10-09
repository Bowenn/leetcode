class Solution:
    def containsNearbyDuplicate(self, nums: list[int], k: int) -> bool:
        index_map = dict()

        for i, n in enumerate(nums):
            if n in index_map and i - index_map[n] <= k:
                return True
            index_map[n] = i
        
        return False

