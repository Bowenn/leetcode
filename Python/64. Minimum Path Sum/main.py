class Solution:
    def minPathSum(self, grid: list[list[int]]) -> int:
        m = len(grid)
        n = len(grid[0])
        row_mins = [50000 for _ in range(n)]
        row_mins[0] = 0

        for i in range(m):
            for j in range(n):
                if j == 0:
                    row_mins[0] += grid[i][j]
                else:
                    row_mins[j] = min(row_mins[j - 1], row_mins[j]) + grid[i][j]

        return row_mins[-1]
