

from collections import deque


class Solution:
    def minimumTotal(self, triangle: list[list[int]]) -> int:
        n = len(triangle)

        min_sums: deque[int] = deque()
        min_sums.append(triangle[0][0])
        for i in range(1, n):
            for j in range(i + 1):
                if j == 0:
                    min_sums.append(min_sums[0] + triangle[i][j])
                    continue
                if j == i:
                    min_sums.append(min_sums[0] + triangle[i][j])
                    min_sums.popleft()
                    continue
                min_sums.append(min(min_sums[0], min_sums[1]) + triangle[i][j])
                min_sums.popleft()
        return min(min_sums)
