class Solution:
    def isPalindrome(self, x: int) -> bool:
        if x < 0:
            return False

        t: int = x
        y: int = 0
        while t > 0:
            y = y * 10 + t % 10;
            t //= 10
        
        if x == y:
            return True
        
        return False
