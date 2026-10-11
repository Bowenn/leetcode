
from collections import defaultdict


class Solution:
    def groupAnagrams(self, strs: list[str]) -> list[list[str]]:
        BASE_CODE = ord("a")
        word_hash_map = defaultdict(list)

        for word in strs:
            hash_key_arr = [0 for _ in range(26)]
            for c in word:
                code = ord(c) - BASE_CODE
                hash_key_arr[code] += 1
            # hash_key = reduce(lambda res, count: res * 26 + count, hash_key_arr)
            hash_key = tuple(hash_key_arr)

            word_hash_map[hash_key].append(word)
        
        return list(word_hash_map.values())

# never thought about sorting the string to get the key, but it is a good idea. And it is quicker.
class Solution2:
    def groupAnagrams(self, strs: list[str]) -> list[list[str]]:
        hs = {}
        for s in strs:
            key = "".join(sorted(s))
            if key not in hs:
                hs[key] = []
            hs[key].append(s)

        return [v for v in hs.values()]