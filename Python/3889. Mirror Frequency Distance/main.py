class Solution:
    def mirrorFrequency(self, s: str) -> int:
        res = 0
        for i in range(5):
            res += abs(s.count(chr(ord('0') + i)) - s.count(chr(ord('9') - i)))

        for i in range(13):
            res += abs(s.count(chr(ord('a') + i)) - s.count(chr(ord('z') - i)))
            
        return res
