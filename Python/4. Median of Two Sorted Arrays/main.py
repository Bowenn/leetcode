from typing import List

class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        m = len(nums1)
        n = len(nums2)
        median = (m + n + 1) // 2

        is_odd = (m + n) & 1

        if m == 0:
            return nums2[median - 1] if is_odd else (nums2[median - 1] + nums2[median]) / 2
        elif n == 0:
            return nums1[median - 1] if is_odd else (nums1[median - 1] + nums1[median]) / 2

        l1 = 0
        r1 = m - 1
        l2 = 0
        r2 = n - 1
        
        removed = 0

        while True:
            target_i = median - removed - 1
            if target_i == 0:
                if is_odd:
                    return min(nums1[l1], nums2[l2])
                else:
                    if nums1[l1] >= nums2[l2]:
                        if l2 + 1 >= n:
                            return (nums2[l2] + nums1[l1]) / 2
                        return (nums2[l2] + min(nums1[l1], nums2[l2 + 1])) / 2
                    else:
                        if l1 + 1 >= m:
                            return (nums1[l1] + nums2[l2]) / 2
                        return (nums1[l1] + min(nums2[l2], nums1[l1 + 1])) / 2
            if l1 == r1:
                if nums2[l2 + target_i] <= nums1[l1]:
                    if is_odd:
                        return nums2[l2 + target_i]
                    else:
                        if l2 + target_i + 1 >= n:
                            return (nums2[l2 + target_i] + nums1[l1]) / 2
                        return (nums2[l2 + target_i] + min(nums2[l2 + target_i + 1], nums1[l1])) / 2
                elif nums2[l2 + target_i - 1] <= nums1[l1]:
                    if is_odd:
                        return nums1[l1]
                    else:
                        if l1 + 1 >= m:
                            return (nums1[l1] + nums2[l2 + target_i]) / 2
                        return (nums1[l1] + min(nums2[l2 + target_i], nums1[l1 + 1])) / 2
                else:
                    if is_odd:
                        return nums2[l2 + target_i - 1]
                    else:
                        if l1 + 1 >= m:
                            return (nums2[l2 + target_i - 1] + nums2[l2 + target_i]) / 2
                        return (nums2[l2 + target_i - 1] + min(nums2[l2 + target_i], nums1[l1 + 1])) / 2
            
            elif l2 == r2:
                if nums1[l1 + target_i] <= nums2[l2]:
                    if is_odd:
                        return nums1[l1 + target_i]
                    else:
                        if l1 + target_i + 1 >= m:
                            return (nums1[l1 + target_i] + nums2[l2]) / 2
                        return (nums1[l1 + target_i] + min(nums1[l1 + target_i + 1], nums2[l2])) / 2
                elif nums1[l1 + target_i - 1] <= nums2[l2]:
                    if is_odd:
                        return nums2[l2]
                    else:
                        if l2 + 1 >= n:
                            return (nums2[l2] + nums1[l1 + target_i]) / 2
                        return (nums2[l2] + min(nums1[l1 + target_i], nums2[l2 + 1])) / 2
                else:
                    if is_odd:
                        return nums1[l1 + target_i - 1]
                    else:
                        if l2 + 1 >= n:
                            return (nums1[l1 + target_i - 1] + nums1[l1 + target_i]) / 2
                        return (nums1[l1 + target_i - 1] + min(nums1[l1 + target_i], nums2[l2 + 1])) / 2

                
            med_i1 = (l1 + r1 + 2) // 2 - 1
            med_i2 = (l2 + r2 + 2) // 2 - 1

            to_remove1 = med_i1 - l1 + 1
            to_remove2 = med_i2 - l2 + 1

            v1 = nums1[med_i1]
            v2 = nums2[med_i2]



            if removed + (to_remove1 + to_remove2) >= median:
                if v1 < v2:
                    r2 = med_i2
                else:
                    r1 = med_i1
            else:
                if v1 < v2:
                    l1 = med_i1 + 1
                    removed += to_remove1
                else:
                    l2 = med_i2 + 1
                    removed += to_remove2

# 
# better solution
# 不是找第n小的数字，而是找能把两个数组分成两半的分割线，使得左边的数字都不大于右边的数字
# 搜索较短的数组，二分搜索
class BetterSolution:
    def findMedianSortedArrays(self, nums1, nums2):
        if len(nums1) > len(nums2):
            nums1, nums2 = nums2, nums1
        
        m, n = len(nums1), len(nums2)
        left, right = 0, m
        
        while left <= right:
            i = (left + right) // 2
            j = (m + n + 1) // 2 - i
            
            maxLeftA = float('-inf') if i == 0 else nums1[i - 1]
            minRightA = float('inf') if i == m else nums1[i]
            
            maxLeftB = float('-inf') if j == 0 else nums2[j - 1]
            minRightB = float('inf') if j == n else nums2[j]
            
            if maxLeftA <= minRightB and maxLeftB <= minRightA:
                if (m + n) % 2 == 0:
                    return (max(maxLeftA, maxLeftB) + min(minRightA, minRightB)) / 2
                else:
                    return max(maxLeftA, maxLeftB)
            
            elif maxLeftA > minRightB:
                right = i - 1
            else:
                left = i + 1