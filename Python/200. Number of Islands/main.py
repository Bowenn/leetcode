from typing import *

class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        m = len(grid)
        n = len(grid[0])

        count = 0

        grid_checked: List[List[bool]] = [[False for _ in range(n)] for _ in range(m)]

        def check(i, j):
            if i < 0 or i >= m or j < 0 or j >= n or grid_checked[i][j] or grid[i][j] == "0":
                return False
            else:
                grid_checked[i][j] = True
                check(i - 1, j)
                check(i + 1, j)
                check(i, j - 1)
                check(i, j + 1)
                return True

        for i in range(m):
            for j in range(n):
                if not grid_checked[i][j] and check(i, j):
                    count += 1

        return count
