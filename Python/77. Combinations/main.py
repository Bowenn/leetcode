class Solution:
    def combine(self, n: int, k: int) -> list[list[int]]:
        result: list[list[int]] = []

        dfs_stack: list[int] = []
        def dfs(base: int, k_left: int):
            nonlocal n, result, dfs_stack
            if k_left == 0:
                # add result and return
                result.append(dfs_stack[:])
                return

            for i in range(base, n + 1):
                dfs_stack.append(i)
                dfs(i + 1, k_left - 1)
                dfs_stack.pop()

        dfs(1, k)

        return result
