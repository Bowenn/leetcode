# 🤖 🧱
# 🧱 🧱 🤖 🧱 🤖 🤖 🧱 🧱 🧱 🧱 🤖 🧱

from typing import List, Dict, Tuple

class Solution:
    def maxWalls(self, robots: List[int], distance: List[int], walls: List[int]) -> int:
        m = len(robots)
        n = len(walls)
        ROBOT = True
        WALL = False
        
        overlapping_walls_count = 0

        pos_dict: Dict[int, Tuple[bool, int]] = {} # position: (robot/wall, distance)
        for i in range(m):
            pos_dict[robots[i]] = (ROBOT, distance[i])
        for i in range(n):
            if walls[i] in pos_dict:
                overlapping_walls_count += 1
            else:
                pos_dict[walls[i]] = (WALL, 0)
        
        last_robot_pos = 0
        last_robot_dis = 0
        last_robot_r_reach_walls_counts = 0
        last_robot_l_res_counts = 0
        last_robot_before_r_res_counts = 0

        pos_list = sorted(list(pos_dict))
        walls_between: List[int] = [] # [pos]
        for pos in pos_list:
            (is_robot, cur_robot_dis) = pos_dict[pos]
            if is_robot:
                # calculate cur robot value
                cur_robot_l_reach_walls_counts = 0
                for wall_pos in walls_between:
                    if wall_pos <= last_robot_pos + last_robot_dis:
                        last_robot_r_reach_walls_counts += 1
                    if wall_pos >= pos - cur_robot_dis:
                        cur_robot_l_reach_walls_counts += 1
                cur_robot_l_res_counts = max(
                    last_robot_l_res_counts + cur_robot_l_reach_walls_counts,
                    last_robot_before_r_res_counts + min(len(walls_between), last_robot_r_reach_walls_counts + cur_robot_l_reach_walls_counts)
                )
                cur_robot_before_r_res_counts = max(
                    last_robot_l_res_counts,
                    last_robot_before_r_res_counts + last_robot_r_reach_walls_counts
                )
                walls_between.clear()

                # replace last with cur
                last_robot_pos = pos
                last_robot_dis = cur_robot_dis
                last_robot_r_reach_walls_counts = 0
                last_robot_l_res_counts = cur_robot_l_res_counts
                last_robot_before_r_res_counts = cur_robot_before_r_res_counts
            else:
                walls_between.append(pos)

        # calc last walls
        for wall_pos in walls_between:
            if wall_pos <= last_robot_pos + last_robot_dis:
                last_robot_r_reach_walls_counts += 1
        
        # max broken walls
        return overlapping_walls_count + max(
            last_robot_l_res_counts,
            last_robot_before_r_res_counts + last_robot_r_reach_walls_counts
        )
