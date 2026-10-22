class Solution:
    def rangeBitwiseAnd(self, left: int, right: int) -> int:
        shift = 0
        while left < right:
            left >>= 1
            right >>= 1
            shift += 1
        return left << shift


class MySolution:
    def rangeBitwiseAnd(self, left: int, right: int) -> int:
        temp = 0
        bit_count = 0
        while left > 0 and right > 0:
            if left & 1 and right & 1:
                temp += 1 << bit_count
            elif left & 1 or right & 1:
                temp = 0
            
            bit_count += 1
            left >>= 1
            right >>= 1
            # print(temp, left, right, bit_count)
        
        if left > 0 or right > 0:
            return 0
        return temp
