
from typing import List, Dict


class Solution:
    def killProcess(self, pid: List[int], ppid: List[int], kill: int) -> List[int]:
        n = len(pid)
        tree_nodes: Dict[int, List[int]] = {}
        # build tree
        for i in range(n):
            cur_pid = pid[i]
            parent_pid = ppid[i]
            if parent_pid not in tree_nodes:
                tree_nodes[parent_pid] = []
            tree_nodes[parent_pid].append(cur_pid)
        
        # bfs
        res: List[int] = [kill]
        offset = 0
        while offset < len(res):
            if res[offset] in tree_nodes:
                for id in tree_nodes[res[offset]]:
                    res.append(id)
            offset += 1

        return res

        


