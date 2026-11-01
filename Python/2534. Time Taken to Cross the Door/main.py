
from collections import deque

# better in code writing
class Solution:
    def timeTaken(self, arrival: list[int], state: list[int]) -> list[int]:
        n = len(arrival)
        to_exit = deque()
        to_enter = deque()
        result = [0] * n
        cur_time = 0
        arrival_offset = 0

        def load_arrivals():
            nonlocal arrival_offset
            while arrival_offset < n and arrival[arrival_offset] <= cur_time:
                if state[arrival_offset] == 1:
                    to_exit.append(arrival_offset)
                else:
                    to_enter.append(arrival_offset)
                arrival_offset += 1

        while arrival_offset < n or to_exit or to_enter:
            # Fast-forward time if nobody is waiting
            if not to_exit and not to_enter:
                cur_time = max(cur_time, arrival[arrival_offset])
                load_arrivals()

            # Drain all continuous exits (has priority after idle or during exit streak)
            while to_exit:
                result[to_exit.popleft()] = cur_time
                cur_time += 1
                load_arrivals()

            # Drain all continuous entries (holds priority once it starts until empty)
            while to_enter:
                result[to_enter.popleft()] = cur_time
                cur_time += 1
                load_arrivals()

        return result

class Solution2:
    def timeTaken(self, arrival: list[int], state: list[int]) -> list[int]:
        n = len(arrival)
        cur_time = -1
        door_status = 1 # 1 - exit, 0 - enter
        to_exit = deque() # person want to exit
        to_enter = deque() # person want to enter

        result = [0 for _ in range(n)]

        arrival_offset = 0
        while True:
            while not to_exit and not to_enter:
                cur_time += 1
                if arrival_offset >= n:
                    return result
                while arrival_offset < n and arrival[arrival_offset] <= cur_time:
                    if state[arrival_offset] == 1:
                        to_exit.append(arrival_offset)
                    else:
                        to_enter.append(arrival_offset)
                    arrival_offset += 1

            while to_exit:
                exiting = to_exit[0]
                to_exit.popleft()
                result[exiting] = cur_time

                cur_time += 1

                while arrival_offset < n and arrival[arrival_offset] <= cur_time:
                    if state[arrival_offset] == 1:
                        to_exit.append(arrival_offset)
                    else:
                        to_enter.append(arrival_offset)
                    arrival_offset += 1

            while to_enter:
                entering = to_enter[0]
                to_enter.popleft()
                result[entering] = cur_time

                cur_time += 1

                while arrival_offset < n and arrival[arrival_offset] <= cur_time:
                    if state[arrival_offset] == 1:
                        to_exit.append(arrival_offset)
                    else:
                        to_enter.append(arrival_offset)
                    arrival_offset += 1
