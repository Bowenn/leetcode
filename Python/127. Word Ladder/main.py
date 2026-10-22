from collections import deque

class Solution:
    def ladderLength(self, beginWord: str, endWord: str, wordList: list[str]) -> int:
        # if beginWord == endWord:
        #     return 0

        shortest_number_count: dict[str, int] = dict() # word: count to get
        for word in wordList:
            shortest_number_count[word] = -1
        if endWord not in shortest_number_count:
            return 0
        CHAR_LIST = "abcdefghijklmnopqrstuvwxyz"

        to_visit: deque[str] = deque()
        to_visit.append(beginWord)
        cur_step = 1

        while True:
            cur_len = len(to_visit)
            if cur_len == 0:
                return 0
            for i in range(cur_len):
                visiting = to_visit[0]
                to_visit.popleft()
                if visiting == endWord:
                    return cur_step
                shortest_number_count[visiting] = cur_step
                for j in range(len(visiting)):
                    prefix = visiting[:j]
                    suffix = visiting[j + 1:]
                    for k in range(26):
                        next_str = prefix + CHAR_LIST[k] + suffix
                        # print(next_str)
                        if next_str not in shortest_number_count:
                            continue
                        if shortest_number_count[next_str] != -1:
                            continue
                        to_visit.append(next_str)
                        shortest_number_count[next_str] = -2
            cur_step += 1