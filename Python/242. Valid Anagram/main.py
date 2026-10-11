
from collections import defaultdict


class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False

        c_map = defaultdict(int)

        for c in s:
            c_map[c] += 1

        for c in t:
            if c not in c_map or c_map[c] <= 0:
                return False
            c_map[c] -= 1

        return True
