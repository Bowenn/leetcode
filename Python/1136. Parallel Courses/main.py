from typing import List
class Solution:
    def minimumSemesters(self, n: int, relations: List[List[int]]) -> int:
        courseDict: List[List[int]] = [[] for _ in range(n)]
        semNeededDict: List[int] = [0 for _ in range(n)]
        for dep in relations:
            courseDict[dep[1] - 1].append(dep[0] - 1)

        pathSet: List[bool] = [False for _ in range(n)]
        def dfs(course):
            nonlocal courseDict, semNeededDict, pathSet
            if pathSet[course]:
                return 0

            pathSet[course] = True

            subSemNeeded = 0
            for subCourse in courseDict[course]:
                searchRes = semNeededDict[subCourse] if semNeededDict[subCourse] > 0 else dfs(subCourse)
                if searchRes == 0:
                    return 0
                elif searchRes > subSemNeeded:
                    subSemNeeded = searchRes

            pathSet[course] = False
            semNeededDict[course] = subSemNeeded + 1
            return semNeededDict[course]

        minSemNeeded = 1
        for course in range(n):
            if semNeededDict[course] == 0:
                if dfs(course) == 0:
                    return -1
            minSemNeeded = max(minSemNeeded, semNeededDict[course])

        return minSemNeeded
