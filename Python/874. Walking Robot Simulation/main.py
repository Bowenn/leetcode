
from typing import List, Set, Tuple

class Solution:
    def robotSim(self, commands: List[int], obstacles: List[List[int]]) -> int:
        # position
        x = 0
        y = 0
        # 0 - North, 1 - East, 2 - South, 3 - West
        d2Move = [
            [0, 1],
            [1, 0],
            [0, -1],
            [-1, 0],
        ]
        d = 0
        move = d2Move[d]
        # d = (d + dCommandDict[command]) % 4
        dCommandDict = [-1, 1]
        obstaclesSet = set(map(tuple, obstacles))
        res = 0

        for c in commands:
            if c < 0:
                res = max(res, x * x + y * y)
                d = (d + dCommandDict[c]) % 4
                move = d2Move[d]
            else:
                for i in range(c):
                    x += move[0]
                    y += move[1]
                    if (x, y) in obstaclesSet:
                        x -= move[0]
                        y -= move[1]
                        break;
        
        res = max(res, x * x + y * y)
        return res
