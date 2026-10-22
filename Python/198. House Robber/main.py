class Solution:
    def rob(self, nums: list[int]) -> int:
        # not rob n
        # g(n) = max(f(n - 1), g(n - 1))
        # rob n
        # f(n) = g(n - 1) + nums[n]

        g_n = 0
        f_n = 0

        for num in nums:
            last_f_n = f_n
            f_n = g_n + num
            g_n = max(g_n, last_f_n)
        
        return max(g_n, f_n)
