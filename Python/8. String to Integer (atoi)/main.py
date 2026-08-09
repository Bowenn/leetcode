MAX = (1 << 31) - 1
MIN = -(1 << 31)
class Solution:
    def myAtoi(self, s: str) -> int:
        res = 0
        negative = False
        signed = False
        for c in s:
            if c == "+":
                if not signed:
                    signed = True
                else:
                    break
            elif c == "-":
                if not signed:
                    signed = True
                    negative = True
                else:
                    break
            elif c == " ":
                if not signed:
                    continue
                else:
                    break
            else:
                n = ord(c) - ord("0")
                if n >= 0 and n <= 9:
                    if not signed:
                        signed = True
                    res = res * 10 + n
                else:
                    break

        return max(-res, MIN) if negative else min(res, MAX)