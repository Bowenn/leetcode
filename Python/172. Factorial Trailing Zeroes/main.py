class Solution:
    def trailingZeroes(self, n: int) -> int:
        # count 5
        base = 5
        count = 0
        
        while True:
            sub_count = n // base
            count += sub_count
            if sub_count == 0:
                break
            base *= 5
        
        return count
