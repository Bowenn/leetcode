class Solution:
    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:
        n1 = len(s1)
        n2 = len(s2)
        if n1 + n2 != len(s3):
            return False
        if n1 == 0:
            return s2 == s3
        if n2 == 0:
            return s1 == s3
        
        # i1 - offset of s1, i2 - offset of s2
        # f(i1, i2) = f(i1 - 1, i2) and s1[i1] === s3[i1 + i2 + 1]
        #           or f(i1, i2 - 1) and s2[i2] === s3[i1 + i2 + 1]

        result_row: list[bool] = [False for _ in range(n2 + 1)]
        
        # python can use -1 as index
        # so we can init -1 values
        result_row[-1] = True
        for i2 in range(n2):
            result_row[i2] = result_row[i2 - 1] and s2[i2] == s3[i2]
        
        # print(result_row)
        for i1 in range(n1):
            result_row[-1] = result_row[-1] and s1[i1] == s3[i1]
            for i2 in range(n2):
                f1: bool = result_row[i2] and (s1[i1] == s3[i1 + i2 + 1])
                f2: bool = result_row[i2 - 1] and (s2[i2] == s3[i1 + i2 + 1])
                result_row[i2] = f1 or f2
            # print(result_row)
        return result_row[n2 - 1]
