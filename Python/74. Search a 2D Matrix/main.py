# time complexity: O(log(m) + log(n)), space complexity: O(1)
class Solution:
    def searchMatrix(self, matrix: list[list[int]], target: int) -> bool:
        m = len(matrix)
        n = len(matrix[0])

        # binary search on m
        l = 0
        r = m - 1

        while l <= r:
            mid = (l + r) // 2
            if matrix[mid][0] == target:
                return True
            elif matrix[mid][0] < target:
                l = mid + 1
            else:
                r = mid - 1
        
        y = l - 1
        if y < 0:
            return False

        # binary search on n
        l = 0
        r = n - 1

        while l <= r:
            mid = (l + r) // 2
            if matrix[y][mid] == target:
                return True
            elif matrix[y][mid] < target:
                l = mid + 1
            else:
                r = mid - 1

        return False
