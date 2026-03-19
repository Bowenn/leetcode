
from typing import List


class Solution:
    def numberOfSubmatrices(self, grid: List[List[str]]) -> int:
        m: int = len(grid)
        n: int = len(grid[0])
        value_grid: List[List[int]] = [[[0, False] for _ in range(n)] for _ in range(m)]
        v_map = {"X": 1, "Y": -1, ".": 0}

        res: int = 0
        for i in range(m):
            flag: bool = False
            temp: int = 0
            for j in range(n):
                v: int = v_map[grid[i][j]]
                temp += v
                if v:
                    flag = True
                if i == 0:
                    value_grid[i][j][0] = temp
                    value_grid[i][j][1] = flag
                else:
                    value_grid[i][j][0] = temp + value_grid[i - 1][j][0]
                    if not flag and value_grid[i - 1][j][1]:
                        flag = True
                    value_grid[i][j][1] = flag

                if value_grid[i][j][1] and not value_grid[i][j][0]:
                    res += 1

        return res

# better solution use numpy, not meaningful to implement here
