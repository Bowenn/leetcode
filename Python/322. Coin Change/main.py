class Solution:
    def coinChange(self, coins: list[int], amount: int) -> int:
        n = len(coins)

        coin_counts: list[int] = [100000 for _ in range(amount + 1)]

        for i in range(n):
            next_coin_counts = [0]
            for j in range(1, amount + 1):
                coin_count = coin_counts[j]
                if j >= coins[i]:
                    coin_count = min(coin_count, next_coin_counts[j - coins[i]] + 1)
                next_coin_counts.append(coin_count)
            coin_counts = next_coin_counts

        return coin_counts[-1] if coin_counts[-1] < 100000 else -1
