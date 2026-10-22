# I solved N-Queens II first, so I reused the code.
class Solution:
    def solveNQueens(self, n: int) -> list[list[str]]:
        result: list[list[str]] = []
        available_row: list[bool] = [True for _ in range(n)]
        placed_queen: list[int] = [-1 for _ in range(n)]
        
        def pos_dfs(placing_col: int):
            nonlocal result, available_row, placed_queen
            if placing_col == n: # all n col placed with a queen
                board = [["." for _ in range(n)] for _ in range(n)]
                for i in range(n):
                    board[i][placed_queen[i]] = "Q"
                    board[i] = "".join(board[i])
                result.append(board)

            # avoid having a queen on the diagonal
            # xj - xi != j - i && xi - xj != j - i 
            diagonal_safe: list[bool] = [True for _ in range(n)]
            for i in range(placing_col):
                banned_row1 = placed_queen[i] - (placing_col - i)
                banned_row2 = placed_queen[i] + (placing_col - i)
                if banned_row1 >= 0 and banned_row1 < n:
                    diagonal_safe[banned_row1] = False
                if banned_row2 >= 0 and banned_row2 < n:
                    diagonal_safe[banned_row2] = False

            # print(placed_queen, available_row)

            # search available square to place queen
            for i in range(n):
                if available_row[i] and diagonal_safe[i]:
                    placed_queen[placing_col] = i
                    available_row[i] = False
                    pos_dfs(placing_col + 1) # place next queen
                    available_row[i] = True

        pos_dfs(0)

        return result