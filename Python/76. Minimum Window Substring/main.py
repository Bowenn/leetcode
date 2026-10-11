import math
from collections import defaultdict

class Solution:
    def minWindow(self, s: str, t: str) -> str:
        minL = 0
        minR = math.inf

        # build a map of t: [char, count]
        t_dict = defaultdict(int)
        for c in t:
            t_dict[c] += 1

        # two pointer method
        match_dict = defaultdict(int)
        to_match_count = len(t)

        curL = 0
        for (curR, c) in enumerate(s):
            if c not in t_dict:
                continue
            else:
                match_dict[c] += 1
                if match_dict[c] <= t_dict[c] and to_match_count > 0:
                    to_match_count -= 1

                if to_match_count == 0:
                    # move left pointer to shrink window
                    while True:
                        if s[curL] not in t_dict:
                            curL += 1
                            continue
                        elif match_dict[s[curL]] > t_dict[s[curL]]:
                            match_dict[s[curL]] -= 1
                            curL += 1
                            continue
                        else:
                            break

                    # calculate the length and record
                    if curR - curL < minR - minL:
                        minR = curR
                        minL = curL
                    
                    # pop left char and continue to move right pointer
                    match_dict[s[curL]] -= 1
                    curL += 1
                    to_match_count += 1

        # print(minL, minR)
        if math.isinf(minR):
            return ""
        assert isinstance(minR, int)
        return s[minL: minR + 1]
