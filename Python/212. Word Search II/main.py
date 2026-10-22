class TrieNode:
    def __init__(self, c: str):
        self.c = c
        self.is_word = False
        self.reverse_is_word = False # use same node to store reverse result
        self.children: dict[str, TrieNode] = dict()

class Trie:
    def __init__(self):
        self.root = TrieNode("")

    def add_word(self, word: str) -> TrieNode:
        cur_node = self.root
        for c in word:
            if c not in cur_node.children:
                cur_node.children[c] = TrieNode(c)
            cur_node = cur_node.children[c]
        
        cur_node.is_word = True
        return cur_node

# time: O(m * n * 4 * 3^(l-1)), space: O(S), S is the sum of all words length
class Solution:
    def findWords(self, board: list[list[str]], words: list[str]) -> list[str]:
        m = len(board)
        n = len(board[0])
    
        # build trie from words
        cache_dict: dict[str, TrieNode] = dict()
        word_trie = Trie()
        for word in words:
            reverse_word = word[::-1]
            if reverse_word in cache_dict:
                cache_dict[reverse_word].reverse_is_word = True
                continue
            node = word_trie.add_word(word)
            cache_dict[word] = node
        
        # find start point
        # start_point_dict: dict[str, set[tuple[int, int]]] = defaultdict(set)
        
        # for i in range(m):
        #     for j in range(n):
        #         start_point_dict[board[i][j]].append((i, j))
        
        def get_char(i: int, j: int) -> str | None:
            nonlocal m, n, board
            if i < 0 or j < 0 or i >= m or j >= n:
                return None
            return board[i][j]

        # dfs trie and board
        result: list[str] = []
        visited_set: set[tuple[int, int]] = set()
        def find_word_dfs(node: TrieNode, cur_word: str, i: int, j: int) -> bool:
            nonlocal result
            visited_set.add((i, j))

            if node.is_word:
                result.append(cur_word)
                node.is_word = False # remove from trie
            if node.reverse_is_word:
                result.append(cur_word[::-1])
                node.reverse_is_word = False

            reachable = [(i - 1, j), (i, j - 1), (i + 1, j), (i, j + 1)]
            for next_i, next_j in reachable:
                if (next_i, next_j) in visited_set:
                    continue
                next_char = get_char(next_i, next_j)
                if next_char is None or next_char not in node.children:
                    continue
                search_res = find_word_dfs(node.children[next_char], cur_word + next_char, next_i, next_j)
                if search_res: # all node in branch is searched, cut branch
                    del node.children[next_char]

            visited_set.remove((i, j))
            # if no children
            if not node.children:
                return True # all branch searched
            return False # still have children waiting for match

        for i in range(m):
            for j in range(n):
                char = board[i][j]
                if char in word_trie.root.children:
                    find_word_dfs(word_trie.root.children[char], char, i, j)

        return result
