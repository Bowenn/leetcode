import heapq
from typing import *

class Solution:
    def minMeetingRooms(self, intervals: List[List[int]]) -> int:
        intervals.sort(key=lambda x: x[0])
        room_ends = []

        for start, end in intervals:
            if room_ends and room_ends[0] <= start:
                heapq.heappop(room_ends)
            heapq.heappush(room_ends, end)

        return len(room_ends)

        # room_ends: List[int] = []
        # sorted_intervals: List[List[int]] = sorted(intervals, key=lambda x: x[0])
        # for meeting in sorted_intervals:
        #     need_new_room: bool = True
        #     for (i, end_time) in enumerate(room_ends):
        #         if end_time <= meeting[0]:
        #             room_ends[i] = meeting[1]
        #             need_new_room = False
        #             break
        #     if need_new_room:
        #         room_ends.append(meeting[1])
        # return len(room_ends)
    