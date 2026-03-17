from functools import reduce
from typing import *

class Solution:
    def ip_i_2str(self, ip_int: int, i: int) -> str:
        res: str = "/" + str(i)
        for i in range(4):
            temp: int = ip_int & 0b11111111
            ip_int >>= 8
            res = "." + str(temp) + res
        return res[1:]

    def ipToCIDR(self, ip: str, n: int) -> List[str]:
        result: List[str] = []
        ip_min: int = reduce(lambda res, cur: (res << 8) + int(cur), ip.split('.'), 0)

        base: int = ip_min
        while n > 0:
            temp = base
            keep: int = 0
            covered_count: int = 1
            while not (temp & 1):
                covered_count <<= 1
                if covered_count > n:
                    covered_count >>= 1
                    break
                keep += 1
                temp >>= 1
            n -= covered_count

            result.append(self.ip_i_2str(base, 32 - keep))
            base += covered_count

        return result


if __name__ == "__main__":
    s = Solution()
    # print(s.ipToCIDR("255.0.0.7", 10))
    print(s.ipToCIDR("117.145.102.62", 8))