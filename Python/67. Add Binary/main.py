class Solution:
    def addBinary(self, a: str, b: str) -> str:
        m = len(a)
        n = len(b)
        res = ""

        temp_bit = 0
        index = -1
        while m + index >= 0 or n + index >= 0 or temp_bit:
            bit_a = 1 if m + index >= 0 and a[index] == "1" else 0
            bit_b = 1 if n + index >= 0 and b[index] == "1" else 0
            bit_sum = bit_a + bit_b + temp_bit

            res = str(bit_sum & 1) + res
            temp_bit = bit_sum >> 1
            index -= 1
        return res
