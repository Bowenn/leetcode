class Solution:
    def uniquePathsWithObstacles(self, obstacleGrid: list[list[int]]) -> int:
        m = len(obstacleGrid)
        n = len(obstacleGrid[0])
        path_counts = [0 for _ in range(n)]

        for i in range(m):
            for j in range(n):
                if obstacleGrid[i][j] == 1:
                    path_counts[j] = 0
                    continue
                elif i == 0 and j == 0:
                    path_counts[0] = 1
                    continue
                path_count = 0
                if i > 0:
                    path_count += path_counts[j]
                if j > 0:
                    path_count += path_counts[j - 1]
                path_counts[j] = path_count
        
        return path_counts[-1]
