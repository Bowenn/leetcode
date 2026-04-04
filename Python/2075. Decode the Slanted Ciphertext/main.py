class Solution:
    def decodeCiphertext(self, encodedText: str, rows: int) -> str:
        n = len(encodedText)
        if n == 0 or rows == 1:
            return encodedText
        cols = n // rows
        res = []

        for i in range(cols):
            for j in range(rows):
                index = j * cols + j + i
                if index < n:
                    res.append(encodedText[j * cols + j + i])
                else:
                    break;
        
        return ''.join(res).rstrip()

