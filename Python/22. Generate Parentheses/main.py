class Solution:
    def generateParenthesis(self, n: int) -> list[str]:
        result: list[str] = []
        close_max = [i + 1 for i in range(n)]
        close_count = [0 for i in range(n)]

        def dfs(index: int, closed_total: int):
            if index == n - 1:
                close_count[n - 1] = n - closed_total
                temp_str = ""
                for i in range(n):
                    temp_str += "("
                    temp_str += ")" * close_count[i]
                result.append(temp_str)
                return

            for i in range(close_max[index] - closed_total + 1):
                close_count[index] = i
                dfs(index + 1, closed_total + i)

        dfs(0, 0)
        return result
