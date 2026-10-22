# time complexity: O(n * n!), space complexity: O(n^2)
class Solution:
    def totalNQueens(self, n: int) -> int:
        count_result: int = 0
        available_row: list[bool] = [True for _ in range(n)]
        placed_queen: list[int] = [-1 for _ in range(n)]
        
        def pos_dfs(placing_col: int):
            nonlocal count_result
            if placing_col == n: # all n col placed with a queen
                count_result += 1

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

        return count_result


# optimized to O(n!) time and O(n) space using bit manipulation
# use bit to represent the available row and diagonal, and use bit operation to check if a square is available
class SolutionBetter:
    def solveNQueens(self, n: int) -> list[list[str]]:
        result: list[list[str]] = []
        placed_queen: list[int] = [-1] * n
        all_ones = (1 << n) - 1  # Mask of n 1s, e.g., 0b1111 for n = 4

        def pos_dfs(placing_col: int, rows: int, diag1: int, diag2: int):
            if placing_col == n:
                # Note: placed_queen[c] stores the row index for column c
                board = [["." for _ in range(n)] for _ in range(n)]
                for col in range(n):
                    board[placed_queen[col]][col] = "Q"
                result.append(["".join(r) for r in board])
                return

            # 1s represent safe rows in the current column
            available = all_ones & ~(rows | diag1 | diag2)

            while available:
                # Isolate the lowest set bit (e.g., 0b0100)
                bit = available & -available
                # Clear the lowest set bit from available choices
                available &= available - 1

                # Convert the bitmask to a 0-indexed row number
                row_idx = bit.bit_length() - 1
                placed_queen[placing_col] = row_idx

                # Move to the next column and shift diagonal masks
                pos_dfs(
                    placing_col + 1,
                    rows | bit,
                    (diag1 | bit) << 1,
                    (diag2 | bit) >> 1,
                )

        pos_dfs(0, 0, 0, 0)
        return result