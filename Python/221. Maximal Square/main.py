class Solution:
    def maximalSquare(self, matrix: list[list[str]]) -> int:
        m = len(matrix)
        n = len(matrix[0])

        """
            f(i, j): edge length of Maximal Square by expanding toward the left-top
            g(i, j): continuious 1 expanding toward top
            h(i, j): continuious 1 expanding toward left

            f(i, j) = 0 matrix[i][j] == 0 else min(f(i - 1, j - 1), g(i - 1, j), h(i, j - 1)) + 1
        """

        max_edge_length = 0

        # [f(i - 1, j - 1), g(i, j), h(i, j)], default 0
        result_row = [[0, 0, 0] for _ in range(n + 1)] # range(n + 1) so that we can use -1 as index

        # print(result_row)
        for i in range(m):
            cached_v = 0 # to save f(i - 1, j - 1)
            for j in range(n):
                if matrix[i][j] == "0":
                    result_row[j] = [0, 0, 0]
                    cached_v = 0
                    continue
                temp = result_row[j][0]
                result_row[j][0] = min(cached_v, result_row[j][1], result_row[j - 1][2]) + 1
                max_edge_length = max(max_edge_length, result_row[j][0])
                result_row[j][1] += 1
                result_row[j][2] = result_row[j - 1][2] + 1
                cached_v = temp
            # print(result_row)
        return max_edge_length * max_edge_length
