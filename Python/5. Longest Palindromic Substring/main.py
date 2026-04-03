class Solution:
    def longestPalindrome(self, s: str) -> str:
        n = len(s)
        res = [1, 0, 0] # length, l, r
        
        for i in range(n):
            # impossible to exceed res[0]
            if res[0] > (n - 1 - i) * 2 + 1:
                break

            # odd
            j = 1
            while i - j >= 0 and i + j < n:
                if s[i - j] != s[i + j]:
                    break
                j += 1
            j -= 1
            if res[0] < j * 2 + 1:
                res[0] = j * 2 + 1
                res[1] = i - j
                res[2] = i + j

            # even
            j = 1
            while i - j + 1 >= 0 and i + j < n:
                if s[i - j + 1] != s[i + j]:
                    break
                j += 1
            j -= 1
            if res[0] < j * 2:
                res[0] = j * 2
                res[1] = i - j + 1
                res[2] = i + j
            
        return s[res[1]:res[2] + 1]



# Better Solution: Manacher's Algorithm in MD file