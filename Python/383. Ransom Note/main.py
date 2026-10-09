
from collections import defaultdict


class Solution:
    def canConstruct(self, ransomNote: str, magazine: str) -> bool:
        # if len(ransomNote) != len(magazine):
        #     return False

        magazine_dict = defaultdict(int)

        for c in magazine:
            magazine_dict[c] += 1

        for c in ransomNote:
            if c not in magazine_dict:
                return False
            magazine_dict[c] -= 1
            if magazine_dict[c] < 0:
                return False
        
        return True
