
import math


class Solution:
    def kthFactor(self, n: int, k: int) -> int:
        sqrt_n = math.isqrt(n)
        has_mid = (sqrt_n * sqrt_n == n)

        # 如果 n 是完全平方数，前半段只遍历到 sqrt_n - 1，把中间因子单独留出来处理
        limit = sqrt_n if has_mid else sqrt_n + 1

        factors: list[int] = []
        for i in range(1, limit):
            if n % i == 0:
                factors.append(i)
                if len(factors) == k:
                    return i

        # print(factors, log_n, log_n_ceil)

        # i * i == n, count i once
        if len(factors) + 1 == k and has_mid:
            return sqrt_n
        
        reverse_k = len(factors) * 2 + (1 if has_mid else 0) - k
        if reverse_k >= 0:
            return n // factors[reverse_k]
        return -1
