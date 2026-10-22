class Solution:
    def climbStairs(self, n: int) -> int:
        # f(n) = f(n - 1) + f(n - 2)
        # f(0) = 1
        # f(1) = 1

        if n <= 1:
            return 1
            
        res = 1
        temp = 1 # n - 1
        temp2 = 1 # n - 2
        
        for i in range(2, n + 1):
            res = temp + temp2
            temp2 = temp
            temp = res
        
        return res
