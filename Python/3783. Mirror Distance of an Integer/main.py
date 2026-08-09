class Solution:
    def mirrorDistance(self, n: int) -> int:
        tn = n
        reversedN = 0
        while tn > 0:
            t = tn // 10
            reversedN = reversedN * 10 + tn - t * 10
            tn = t
        return abs(reversedN - n)
