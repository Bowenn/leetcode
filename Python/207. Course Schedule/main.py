
from typing import List, Dict, Set

class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        dependencies_dict: Dict[int, List[int]] = {}
        for item in prerequisites:
            if item[0] not in dependencies_dict:
                dependencies_dict[item[0]] = []
            dependencies_dict[item[0]].append(item[1])

        search_set = set()
        def dfs(course):
            nonlocal search_set, dependencies_dict
            if course in search_set:
                return True
            search_set.add(course)
            if course in dependencies_dict:
                for pre_course in dependencies_dict[course]:
                    if dfs(pre_course):
                        return True
                del dependencies_dict[course]
            search_set.remove(course)
            return False

        for i in range(numCourses):
            if i in dependencies_dict:
                if dfs(i):
                    return False
        return True
