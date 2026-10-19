from collections import Counter

class Solution:
    def exist(self, board: list[list[str]], word: str) -> bool:
        m = len(board)
        n = len(board[0])

        visited = [[False for _ in range(n)] for _ in range(m)]
        
        def is_valid(i: int, j: int) -> bool:
            return not (i < 0 or j < 0 or i >= m or j >= n)
            return board[i][j]
        
        def dfs(word_index: int, cur_i: int, cur_j: int) -> bool:
            if word_index == len(word):
                return True
            if is_valid(cur_i, cur_j) and not visited[cur_i][cur_j] and board[cur_i][cur_j] == word[word_index]:
                visited[cur_i][cur_j] = True
                for next_i, next_j in [(cur_i - 1, cur_j), (cur_i + 1, cur_j), (cur_i, cur_j - 1), (cur_i, cur_j + 1)]:
                    if dfs(word_index + 1, next_i, next_j):
                        return True
                visited[cur_i][cur_j] = False
            return False

        for i in range(m):
            for j in range(n):
                if dfs(0, i, j):
                    return True

        return False

# optimized version with pruning
class SolutionBetter:
    def exist(self, board: list[list[str]], word: str) -> bool:
        m = len(board)
        n = len(board[0])

        # 1. Count character frequencies in the board and the word
        board_counts = Counter(char for row in board for char in row)
        word_counts = Counter(word)

        # Pruning Step 1: If the board doesn't have enough of any required letter, abort immediately
        for char, count in word_counts.items():
            if board_counts[char] < count:
                return False

        # Pruning Step 2: If the first letter of `word` is more common on the board than the last letter,
        # reverse the word so we start DFS from the rarer character.
        if board_counts[word[0]] > board_counts[word[-1]]:
            word = word[::-1]

        # --- Your existing DFS code below ---
        visited = [[False for _ in range(n)] for _ in range(m)]
        ...