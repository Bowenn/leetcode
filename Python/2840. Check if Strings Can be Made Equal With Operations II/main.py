from typing import List, Counter
class Solution(object):
    def checkStrings(self, s1, s2):
        """
        :type s1: str
        :type s2: str
        :rtype: bool
        """
        dict_odd: List[int] = [0 for _ in range(26)]
        dict_even: List[int] = [0 for _ in range(26)]
        n: int = len(s1)
        flag: bool = True

        for i in range(n):
            c1 = ord(s1[i]) - ord('a')
            c2 = ord(s2[i]) - ord('a')
            if flag:
                dict_odd[c1] += 1
                dict_odd[c2] -= 1
            else:
                dict_even[c1] += 1
                dict_even[c2] -= 1
            flag = not flag
        
        for c in dict_odd:
            if c != 0:
                return False

        for c in dict_even:
            if c != 0:
                return False
        
        return True

class BetterSolution:
    from collections import Counter
    def checkStrings(self, s1: str, s2: str) -> bool:
        return (Counter(s1[0::2]) == Counter(s2[0::2]) and
                Counter(s1[1::2]) == Counter(s2[1::2]))
