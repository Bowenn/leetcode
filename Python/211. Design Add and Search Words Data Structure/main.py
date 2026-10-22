class TrieNode:
    def __init__(self, c: str):
        self.is_word = False
        self.c = c
        self.children: dict[str, TrieNode] = dict()

class WordDictionary:

    def __init__(self):
        self.root = TrieNode("")

    def addWord(self, word: str) -> None:
        cur_node = self.root
        for c in word:
            if c not in cur_node.children:
                cur_node.children[c] = TrieNode(c)
            cur_node = cur_node.children[c]
        cur_node.is_word = True

    def search(self, word: str) -> bool:
        cur_search_node = [self.root]
        next_search_node: list[TrieNode] = []

        for c in word:
            if len(cur_search_node) == 0:
                return False
            if c == ".":
                for node in cur_search_node:
                    next_search_node.extend(node.children.values())
            else:
                for node in cur_search_node:
                    if c in node.children:
                        next_search_node.append(node.children[c])
            cur_search_node = next_search_node
            next_search_node = []

        for node in cur_search_node:
            if node.is_word:
                return True

        return False


# Your WordDictionary object will be instantiated and called as such:
# obj = WordDictionary()
# obj.addWord(word)
# param_2 = obj.search(word)
