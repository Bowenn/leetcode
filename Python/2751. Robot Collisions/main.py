from typing import List, Dict

class Solution:
    def survivedRobotsHealths(self, positions: List[int], healths: List[int], directions: str) -> List[int]:
        n: int = len(positions)
        i_seq: List[int] = [i for i in range(n)]
        i_seq.sort(key = lambda i: positions[i])
        print(i_seq)

        moving_i_stack: List[int] = []
        moving_health_stack: List[int] = []
        robot_left_dict: Dict[int, int] = {} # (index, health_left)

        for index in i_seq:
            h = healths[index]
            if directions[index] == "L":
                while h > 0 and moving_health_stack:
                    if moving_health_stack[-1] > h:
                        moving_health_stack[-1] -= 1
                        h = 0
                    elif moving_health_stack[-1] == h:
                        moving_health_stack.pop()
                        moving_i_stack.pop()
                        h = 0
                    else:
                        moving_health_stack.pop()
                        moving_i_stack.pop()
                        h -= 1
                if h > 0:
                    robot_left_dict[index] = h
            else:
                moving_health_stack.append(h)
                moving_i_stack.append(index)
        
        for i in range(len(moving_health_stack)):
            robot_left_dict[moving_i_stack[i]] = moving_health_stack[i]

        res: List[int] = []

        for index in range(n):
            if index in robot_left_dict:
                res.append(robot_left_dict[index])
        
        return res
