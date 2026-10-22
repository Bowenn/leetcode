class Solution:
    def hammingWeight(self, n: int) -> int:
        count = 0
        while n > 0:
            # normal way
            # count += n & 1
            # n >>= 1

            # trick way
            # n:            1011000
            # n - 1:        1010111
            # n & (n - 1):  1010000
            count += 1
            n &= (n - 1)
        return count
