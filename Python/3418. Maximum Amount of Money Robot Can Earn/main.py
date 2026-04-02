
from typing import List


class Solution:
    def maximumAmount(self, coins: List[List[int]]) -> int:
        m = len(coins)
        n = len(coins[0])
        d = 3
        result = [
            [
                [
                    0 for _ in range(d)
                ] for _ in range(n)
            ] for _ in range(m)
        ]

        # first cell
        result[0][0][d - 1] = coins[0][0]
        if coins[0][0] > 0 and d > 0:
            for k in range(d - 1):
                result[0][0][k] = coins[0][0]

        # first col
        for i in range(1, m):
            for k in range(d - 1, -1, -1):
                if coins[i][0] >= 0 or k == d - 1:
                    result[i][0][k] = result[i - 1][0][k] + coins[i][0]
                else:
                    result[i][0][k] = max(
                        result[i - 1][0][k] + coins[i][0],
                        result[i - 1][0][k + 1]
                    )

        # first row
        for j in range(1, n):
            for k in range(d - 1, -1, -1):
                if coins[0][j] >= 0 or k == d - 1:
                    result[0][j][k] = result[0][j - 1][k] + coins[0][j]
                else:
                    result[0][j][k] = max(
                        result[0][j - 1][k] + coins[0][j],
                        result[0][j - 1][k + 1]
                    )

        # other
        for i in range(1, m):
            for j in range(1, n):
                for k in range(d - 1, -1, -1):
                    if coins[i][j] >= 0 or k == d - 1:
                        result[i][j][k] = max(result[i][j - 1][k], result[i - 1][j][k]) + coins[i][j]
                    else:
                        result[i][j][k] = max(
                            result[i][j - 1][k] + coins[i][j],
                            result[i][j - 1][k + 1],
                            result[i - 1][j][k] + coins[i][j],
                            result[i - 1][j][k + 1],
                        )

        return result[m - 1][n - 1][0]
