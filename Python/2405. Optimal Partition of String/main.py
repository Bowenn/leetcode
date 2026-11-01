class Solution:
    def partitionString(self, s: str) -> int:
        result = 1
        char_set: set[str] = set()
        for c in s:
            if c in char_set:
                result += 1
                char_set = set()

            char_set.add(c)
        
        return result
