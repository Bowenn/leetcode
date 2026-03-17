from typing import *
class Solution:
    def longestCommonPrefix(self, strs: List[str]) -> str:
        if len(strs) == 0:
            return ""

        base: str = strs[0]
        i: int = 0
        while True:
            if i >= len(base):
                return base[:i]
            c: str = strs[0][i]
            for s in strs[1:]:
                if len(s) <= i or s[i] != c:
                    return base[:i]
            i += 1