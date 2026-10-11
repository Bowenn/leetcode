class Solution:
    def isIsomorphic(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False

        char_map = dict()
        char_map_back = dict()

        for i in range(len(s)):
            # print(s[i], t[i], char_map[s[i]] if s[i] in char_map else None)
            if (s[i] in char_map and char_map[s[i]] != t[i]) or (t[i] in char_map_back and char_map_back[t[i]] != s[i]):
                return False
            char_map[s[i]] = t[i]
            char_map_back[t[i]] = s[i]

        return True
