
from typing import Tuple, List, Dict
import bisect


class TimeMap_BST:
    storeDict: Dict[str, List[Tuple[int, str]]] # key: [(timestamp, value)]

    def __init__(self):
        self.storeDict = dict()

    def set(self, key: str, value: str, timestamp: int) -> None:
        if key not in self.storeDict:
            self.storeDict[key] = [(timestamp, value)]
            return

        # Since the timestamps are strictly increasing, we can simply append the new (timestamp, value) pair to the list.
        self.storeDict[key].append((timestamp, value))

        # If the timestamps were not guaranteed to be in increasing order, we would need to find the correct position.
        # key=lambda x: x[0] ensures we sort by the timestamp
        # bisect.insort(self.storeDict[key], (timestamp, value), key=lambda x: x[0])

    def get(self, key: str, timestamp: int) -> str:
        if key not in self.storeDict:
            return ""

        storeList = self.storeDict[key]

        # pre-check the timestamp against the first and last, which obviously makes it faster.
        if timestamp < storeList[0][0]:
            return ""
        elif timestamp > storeList[-1][0]:
            return storeList[-1][1]

        # bisect_right finds the insertion point after any existing entries 
        # with the same timestamp. 
        index = bisect.bisect_right(storeList, timestamp, key=lambda x: x[0])

        if index <= 0:
            return ""
        return storeList[index - 1][1]


# Your TimeMap object will be instantiated and called as such:
# obj = TimeMap()
# obj.set(key,value,timestamp)
# param_2 = obj.get(key,timestamp)