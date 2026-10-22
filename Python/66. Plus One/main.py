class Solution:
    def plusOne(self, digits: list[int]) -> list[int]:
        res = digits[:]
        t = 1
        for i in range(-1, -len(res) - 1, -1):
            if res[i] == 9:
                res[i] = 0
            else:
                res[i] += 1
                t = 0
                break

        if t == 1:
            res.insert(0, 1)
        return res
