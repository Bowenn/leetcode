
from typing import List

class Solution:
    def closestTarget(self, words: List[str], target: str, startIndex: int) -> int:
        if words[startIndex] == target:
            return 0
        n = len(words)
        for i in range(1, n // 2 + 1):
            l = (startIndex - i + n) % n
            r = (startIndex + i) % n
            if words[l] == target or words[r] == target:
                return i
        return -1
