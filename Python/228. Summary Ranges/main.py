class Solution:
    def summaryRanges(self, nums: list[int]) -> list[str]:
        result: list[str] = list()
        if len(nums) == 0:
            return result

        range_start = nums[0]
        range_end = nums[0] - 1

        for n in nums:
            if n == range_end + 1:
                range_end += 1
            else:
                result.append(f'{range_start}->{range_end}' if range_end > range_start else str(range_start))
                range_start = n
                range_end = n

        result.append(f'{range_start}->{range_end}' if range_end > range_start else str(range_start))
        return result
