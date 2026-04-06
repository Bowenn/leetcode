
from typing import Dict, List
class Solution:
    def findGoodIntegers(self, n: int) -> list[int]:
        if n < 1729:
            return []
        elif n < 4104:
            return [1729]
        elif n < 13832:
            return [1729,4104]

        calcRes: List[int] = []
        i = 1
        while True:
            calced = i * i * i
            if calced > n:
                break;
            calcRes.append(calced)
            i += 1

        l = len(calcRes)
        resDict: Dict[int, int] = {}
        res: List[int] = []
        for a in range(l):
            for b in range(a, l):
                sum = calcRes[a] + calcRes[b]
                if sum > n:
                    break;
                if sum in resDict:
                    if resDict[sum] == 0:
                        resDict[sum] = 1
                        res.append(sum)
                else:
                    resDict[sum] = 0
        return sorted(res)
