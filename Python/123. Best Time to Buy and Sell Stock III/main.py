class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        """
            f(i) = max(g(i - 1) + prices[i], f(i - 1)) # not hold since day i
            g(i) = max(f(i - 1) - prices[i], g(i - 1)) # hold since day i

            # k: transaction times ~ [0,2]
            f(i, k) = max(g(i - 1, k) + prices[i], f(i - 1, k))
            g(i, k) = max(f(i - 1, k - 1) - prices[i], g(i - 1, k))
        """

        # [f(i, 0), g(i, 0), f(i, 1), g(i, 1), f(i, 2), g(i, 2), f(i, -1), g(i, -1)]
        temp_array = [0, -100000, 0, -100000, 0, -100000, -100000, -100000] # i == -1, -100000 means N/A

        for i in range(len(prices)):
            for k in range(2, -1, -1):
                old_g = temp_array[k * 2 + 1]
                # update g(i, k)
                temp_array[k * 2 + 1] = max(temp_array[k * 2 + 1], temp_array[(k - 1) * 2] - prices[i])
                # update f(i, k)
                temp_array[k * 2] = max(old_g + prices[i], temp_array[k * 2])
        
        return max(temp_array)
