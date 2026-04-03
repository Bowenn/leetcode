from typing import List
class Solution:
    def convert(self, s: str, numRows: int) -> str:
        if numRows == 1:
            return s

        n = len(s)
        res: List[str] = ["" for _ in range(numRows)]

        offset = 0
        row = 0
        d = 1
        
        while offset < n:
            res[row] += s[offset]
            if row == 0:
                d = 1
            elif row == numRows - 1:
                d = -1
            row += d
            offset += 1

        return "".join(res)

