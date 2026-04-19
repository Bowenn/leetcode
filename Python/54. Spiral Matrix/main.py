
from typing import List

class Solution:
    def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
        i = 0
        j = 0
        up = 0
        down = len(matrix)
        left = -1
        right = len(matrix[0])

        res = [matrix[0][0]]

        while True:
            # right
            while True:
                j += 1
                if j >= right:
                    j -= 1
                    break
                res.append(matrix[i][j])
            right -= 1
            if left >= right:
                break
            # down
            while True:
                i += 1
                if i >= down:
                    i -= 1
                    break
                res.append(matrix[i][j])
            down -= 1
            if up >= down:
                break
            # left
            while True:
                j -= 1
                if j <= left:
                    j += 1
                    break
                res.append(matrix[i][j])
            left += 1
            if left >= right:
                break
            # up
            while True:
                i -= 1
                if i <= up:
                    i += 1
                    break
                res.append(matrix[i][j])
            up += 1
            if up >= down:
                break

        return res