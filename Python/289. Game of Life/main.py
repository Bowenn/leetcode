
# time complexity: O(m * n), space complexity: O(n)
# can be optimized to O(1) space complexity by using bit manipulation to store the next state of each cell in the current state of the board
class Solution:
    def gameOfLife(self, board: list[list[int]]) -> None:
        """
        Do not return anything, modify board in-place instead.
        """
        m = len(board)
        n = len(board[0])

        temp_row = [0 for _ in range(n)]
        temp_front_one = 0

        def next_state(y: int, x: int):
            nonlocal temp_row, temp_front_one
            
            t = board[y][x]

            live_count = 0
            if y - 1 >= 0:
                if x - 1 >= 0 and temp_row[x - 1] == 1: # top-left
                    live_count += 1
                if temp_row[x] == 1: # top
                    live_count += 1
                if x + 1 < n and temp_row[x + 1] == 1: # top-right
                    live_count += 1
            if temp_front_one == 1: # left
                live_count += 1
            if x + 1 < n and board[y][x + 1] == 1: # right
                live_count += 1
            if y + 1 < m:
                if x - 1 >= 0 and board[y + 1][x - 1] == 1: # bottom-left
                    live_count += 1
                if board[y + 1][x] == 1: # bottom
                    live_count += 1
                if x + 1 < n and board[y + 1][x + 1] == 1: # bottom-right
                    live_count += 1

            if (t == 1 and (live_count == 2 or live_count == 3)) or (t == 0 and live_count == 3):
                board[y][x] = 1
            else:
                board[y][x] = 0
            temp_front_one = t
            # print(y, x, live_count)

        for i in range(m):
            next_temp = board[i][:]
            temp_front_one = 0
            for j in range(n):
                next_state(i, j)
            temp_row = next_temp
