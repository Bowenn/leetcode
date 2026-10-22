class Solution:
    def mySqrt(self, x: int) -> int:
        if x == 1:
            return 1

        l = 1
        r = x // 2
        while l <= r:
            mid = (l + r) // 2
            square_mid = mid * mid
            if square_mid == x:
                return mid
            elif square_mid < x:
                l = mid + 1
            else:
                r = mid - 1

        return r
