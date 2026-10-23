class Solution:
    def maxProfit(self, k: int, prices: list[int]) -> int:
        """
            f(i) = max(g(i - 1) + prices[i], f(i - 1)) # not hold since day i
            g(i) = max(f(i - 1) - prices[i], g(i - 1)) # hold since day i

            # j: transaction times ~ [0,k]
            f(i, j) = max(g(i - 1, j) + prices[i], f(i - 1, j))
            g(i, j) = max(f(i - 1, j - 1) - prices[i], g(i - 1, j))
        """

        # [f(i, 0), g(i, 0), ..., f(i, j), g(i, j), f(i, -1), g(i, -1)]
        # [0, -100000, ..., 0, -100000, -100000, -100000] # i == -1, -100000 means N/A
        temp_array = [0, -100000] * (k + 1)
        temp_array.append(-100000) # append f(i, -1), g(i, -1) behind
        temp_array.append(-100000)

        for i in range(len(prices)):
            for j in range(k, -1, -1):
                old_g = temp_array[j * 2 + 1]
                # update g(i, j)
                temp_array[j * 2 + 1] = max(temp_array[j * 2 + 1], temp_array[(j - 1) * 2] - prices[i])
                # update f(i, j)
                temp_array[j * 2] = max(old_g + prices[i], temp_array[j * 2])
        
        return max(temp_array)
