
class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        n1 = len(word1)
        n2 = len(word2)
        if n1 == 0:
            return n2
        if n2 == 0:
            return n1

        """
        f(i1, i2) = f(i1 - 1, i2 - 1) if word1[i1] == word2[i2] else
               min(f(i1, i2 - 1) + 1, f(i1 - 1, i2) + 1, f(i1 - 1, i2 - 1) + 1)
        """
        res_row = [(i + 1) for i in range(n2)]
        res_row.append(0)

        # print(res_row)
        for i1 in range(n1):
            cached_step_value = res_row[-1] # f(i1 - 1, i2 - 1)
            res_row[-1] = i1 + 1
            for i2 in range(n2):
                temp = res_row[i2]
                res_row[i2] = cached_step_value if word1[i1] == word2[i2] else min(
                        res_row[i2 - 1], # delete in word2 or insert in word1
                        res_row[i2], # insert in word2 or delete in word1
                        cached_step_value, # replace
                    ) + 1
                cached_step_value = temp
            # print(res_row)

        return res_row[-2]
