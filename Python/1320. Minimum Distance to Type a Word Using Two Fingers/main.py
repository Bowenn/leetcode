
from typing import List, Tuple, Dict


# O(26n) time, O(26) space
LETTER_MAP = [
    (0, 0), (0, 1), (0, 2), (0, 3), (0, 4), (0, 5),
    (1, 0), (1, 1), (1, 2), (1, 3), (1, 4), (1, 5),
    (2, 0), (2, 1), (2, 2), (2, 3), (2, 4), (2, 5),
    (3, 0), (3, 1), (3, 2), (3, 3), (3, 4), (3, 5),
    (4, 0), (4, 1)
]
class Solution:
    def minimumDistance(self, word: str) -> int:
        n = len(word)
        if n <= 2:
            return 0
        MAX_DIS = n * 10

        disCache: Dict[Tuple[int, int], int] = {}
        def calcDis (c1: int, c2: int) -> int:
            nonlocal disCache
            if (c1, c2) in disCache:
                return disCache[(c1, c2)]
            p1 = LETTER_MAP[c1]
            p2 = LETTER_MAP[c2]
            dis = abs(p1[0] - p2[0]) + abs(p1[1] - p2[1])
            disCache[(c1, c2)] = dis
            disCache[(c2, c1)] = dis
            return dis

        dpWindow = [0 for _ in range(26)]

        cInt = ord(word[0]) - ord('A')
        lastCInt = -1
        for i in range(1, n):
            if word[i] == word[i - 1]:
                continue
            lastCInt = cInt
            cInt = ord(word[i]) - ord('A')
            # one hand is at word[i - 1], one hand is at word[i]
            minDisK2I = MAX_DIS
            for k in range(26):
                if k == lastCInt:
                    continue
                minDisK2I = min(minDisK2I, dpWindow[k] + calcDis(k, cInt))
            dpWindow[lastCInt] = minDisK2I
            # one hand is at ('A' + j), one hand is at word[i]
            for j in range(26):
                if j == lastCInt:
                    continue
                dpWindow[j] = dpWindow[j] + calcDis(lastCInt, cInt)
            
        return min(dpWindow)

# O(n^2) time, O(n^2) space
LETTER_MAP_OLD = {
    'A': (0, 0), 'B': (0, 1), 'C': (0, 2), 'D': (0, 3), 'E': (0, 4), 'F': (0, 5),
    'G': (1, 0), 'H': (1, 1), 'I': (1, 2), 'J': (1, 3), 'K': (1, 4), 'L': (1, 5),
    'M': (2, 0), 'N': (2, 1), 'O': (2, 2), 'P': (2, 3), 'Q': (2, 4), 'R': (2, 5),
    'S': (3, 0), 'T': (3, 1), 'U': (3, 2), 'V': (3, 3), 'W': (3, 4), 'X': (3, 5),
    'Y': (4, 0), 'Z': (4, 1)
}
class OldSolution:
    def minimumDistance(self, word: str) -> int:
        n = len(word)
        if n <= 2:
            return 0
        MAX_DIS = n * 10
        # dpMap[i][j] (j < i) means the min dis when one hand is at word[i], while another hand is at word[j]
        # use dpMap[i][i] to represent that another hand is idle
        dpMap: List = [[0 for _ in range(n)] for _ in range(n)]
        disCache: Dict[Tuple[str, str], int] = {}
        def calcDis (c1, c2):
            nonlocal disCache
            if (c1, c2) in disCache:
                return disCache[(c1, c2)]
            p1 = LETTER_MAP[c1]
            p2 = LETTER_MAP[c2]
            dis = abs(p1[0] - p2[0]) + abs(p1[1] - p2[1])
            disCache[(c1, c2)] = dis
            disCache[(c2, c1)] = dis
            return dis

        for i in range(1, n):
            dpMap[i][i] = dpMap[i - 1][i - 1] + calcDis(word[i - 1], word[i])
            for j in range(i - 1):
                dpMap[i][j] = dpMap[i - 1][j] + calcDis(word[i - 1], word[i])
            dpMap[i][i - 1] = dpMap[i - 1][i - 1]
            for k in range(i - 1):
                disK2I = dpMap[i - 1][k] + calcDis(word[k], word[i])
                if disK2I < dpMap[i][i - 1]:
                    dpMap[i][i - 1] = disK2I

        minDis = dpMap[-1][-1]
        for i in range(n - 1):
            minDis = min(minDis, dpMap[-1][i])

        return minDis
