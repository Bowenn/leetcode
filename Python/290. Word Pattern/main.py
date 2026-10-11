class Solution:
    def wordPattern(self, pattern: str, s: str) -> bool:
        s_arr = s.split(' ')
        if (len(pattern) != len(s_arr)):
            return False

        w_map = dict()
        w_map_back = dict()

        for i in range(len(pattern)):
            if (pattern[i] in w_map and w_map[pattern[i]] != s_arr[i]) or (s_arr[i] in w_map_back and w_map_back[s_arr[i]] != pattern[i]):
                return False
            w_map[pattern[i]] = s_arr[i]
            w_map_back[s_arr[i]] = pattern[i]

        return True
