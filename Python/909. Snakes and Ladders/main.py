from collections import deque

class Solution:
    def snakesAndLadders(self, board: list[list[int]]) -> int:
        n = len(board)
        n2 = n * n
        # -1 for never visit, -2 for visiting, >=0 for min_step
        min_step: list[int] = [-1 for _ in range(n2 + 1)]
        cur_step = 0
        min_step[0] = 0

        def get_board_value(num: int) -> tuple[int, int]:
            nonlocal board, n
            y = (num - 1) // n
            x = (num - 1) % n
            
            i = n - 1 - y
            j = n - 1 - x if y & 1 else x
            return (i, j)

        to_visit: deque[int] = deque()
        to_visit.append(1)

        while True:
            len_to_visit = len(to_visit)
            if len_to_visit == 0:
                break
            for i in range(len_to_visit):
                visiting = to_visit[0]
                if visiting == n2:
                    return cur_step
                min_step[visiting] = cur_step
                to_visit.popleft()
                # next to visit
                for next_num in range(visiting + 1, min(visiting + 7, n2 + 1)):
                    (next_i, next_j) = get_board_value(next_num)
                    destination = next_num if board[next_i][next_j] == -1 else board[next_i][next_j]
                    if min_step[destination] != -1:
                        # already visited before
                        continue
                    to_visit.append(destination)
                    min_step[destination] = -2
            cur_step += 1
        return -1
