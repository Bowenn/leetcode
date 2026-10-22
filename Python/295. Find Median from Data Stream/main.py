import heapq


class MedianFinder:

    def __init__(self):
        self.low_part_max_heap: list[int] = []
        self.high_part_min_heap: list[int] = []

    def addNum(self, num: int) -> None:
        if not self.low_part_max_heap:
            self.low_part_max_heap.append(num)
        elif not self.high_part_min_heap:
            if self.low_part_max_heap[0] > num:
                t = self.low_part_max_heap[0]
                self.low_part_max_heap[0] = num
                num = t
            self.high_part_min_heap.append(num)
        else:
            low_max = self.low_part_max_heap[0]
            high_min = self.high_part_min_heap[0]

            if len(self.low_part_max_heap) == len(self.high_part_min_heap):
                if high_min < num:
                    heapq.heapreplace(self.high_part_min_heap, num)
                    heapq.heappush_max(self.low_part_max_heap, high_min)
                else:
                    heapq.heappush_max(self.low_part_max_heap, num)
            else:
                if low_max > num:
                    heapq.heapreplace_max(self.low_part_max_heap, num)
                    heapq.heappush(self.high_part_min_heap, low_max)
                else:
                    heapq.heappush(self.high_part_min_heap, num)



    def findMedian(self) -> float:
        # print(self.low_part_max_heap, self.high_part_min_heap)
        if len(self.low_part_max_heap) == len(self.high_part_min_heap):
            return (self.low_part_max_heap[0] + self.high_part_min_heap[0]) / 2
        else:
            return self.low_part_max_heap[0]


# Your MedianFinder object will be instantiated and called as such:
# obj = MedianFinder()
# obj.addNum(num)
# param_2 = obj.findMedian()
