class Solution:
    def insert(self, intervals: list[list[int]], newInterval: list[int]) -> list[list[int]]:
        new_list = []
        
        for i, interval in enumerate(intervals):
            # 1. interval is completely to the left
            if interval[1] < newInterval[0]:
                new_list.append(interval)
            # 2. interval is completely to the right
            elif interval[0] > newInterval[1]:
                new_list.append(newInterval)
                return new_list + intervals[i:]
            # 3. intervals overlap: merge into newInterval
            else:
                newInterval[0] = min(newInterval[0], interval[0])
                newInterval[1] = max(newInterval[1], interval[1])
                
        # If newInterval was never added (it belongs at the very end)
        new_list.append(newInterval)
        return new_list
