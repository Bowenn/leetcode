
from typing import List, Set

class Solution:
    def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
        coursesDependencies: List[List[int] | None] = [[] for _ in range(numCourses)]
        for [p, q] in prerequisites:
            coursesDependencies[p].append(q)

        res: List[int] = []
        pathSet: Set[int] = set()
        def dfs(course: int) -> bool:
            nonlocal res, pathSet
            if course in pathSet:
                return False
            pathSet.add(course)

            if coursesDependencies[course] is not None:
                for d in coursesDependencies[course]:
                    if not dfs(d):
                        return False
                coursesDependencies[course] = None
                res.append(course)

            pathSet.remove(course)
            return True

        for i in range(numCourses):
            searchRes = dfs(i)
            if not searchRes:
                return []
            pathSet.clear()
        
        return res
