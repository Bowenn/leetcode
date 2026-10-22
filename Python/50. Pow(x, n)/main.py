class Solution:
    def myPow(self, x: float, n: int) -> float:
        res = 1
        base = x
        negative = n < 0
        if negative:
            n = -n

        while n > 0:
            if n & 1:
                res *= base
            n >>= 1
            base *= base

        return res if not negative else 1 / res
