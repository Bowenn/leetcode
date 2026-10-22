

from collections import defaultdict
import math

class Solution:
    def maxPoints(self, points: list[list[int]]) -> int:
        n = len(points)
        # line_counts: list[dict[float, int]] = [defaultdict(int) for _ in range(n)] # [{slope: count, ...}, ...]

        result = 1
        for i in range(n):
            line_counts: dict[float, int] = defaultdict(int)  # Fresh dict for each point i
            for j in range(i):
                slope: float = math.inf if points[j][0] == points[i][0] else (points[j][1] - points[i][1]) / (points[j][0] - points[i][0])
                line_counts[slope] += 1
                result = max(result, line_counts[slope] + 1)
        
        return result
