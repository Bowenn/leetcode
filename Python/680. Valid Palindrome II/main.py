
# time: O(n)
# space: O(n)
class Solution:
    def validPalindrome(self, s: str) -> bool:
        return self._validPalindrome(s, True)
    def _validPalindrome(self, s: str, allowDelete: bool) -> bool:
        n = len(s)
        l = 0
        r = n - 1
        while l < r:
            if s[l] != s[r]:
                if allowDelete:
                    if s[l + 1] == s[r]:
                        if self._validPalindrome(s[l + 1:r + 1], False):
                            return True
                    if s[l] == s[r - 1]:
                        if self._validPalindrome(s[l:r], False):
                            return True
                return False
            else:
                l += 1
                r -= 1

        return True
