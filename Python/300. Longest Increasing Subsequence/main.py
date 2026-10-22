class Solution:
    def lengthOfLIS(self, nums: list[int]) -> int:
        threshold_LIS: list[int] = []

        for num in nums:
            for i in range(len(threshold_LIS)):
                if num <= threshold_LIS[i]:
                    threshold_LIS[i] = num
                    break
            else:
                threshold_LIS.append(num)

        return len(threshold_LIS)             
