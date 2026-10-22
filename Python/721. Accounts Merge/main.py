
from collections import defaultdict

# time: O(n*klog(n*k)), space: O(n*k)
class Solution:
    def accountsMerge(self, accounts: list[list[str]]) -> list[list[str]]:
        n = len(accounts)
        path_sets: dict[int, set[int]] = defaultdict(set)
        email_dict: dict[str, int] = dict()

        for i, account in enumerate(accounts):
            for j in range(1, len(account)):
                if account[j] in email_dict:
                    path_sets[email_dict[account[j]]].add(i)
                    path_sets[i].add(email_dict[account[j]])
                else:
                    email_dict[account[j]] = i

        # print(path_sets)
        visited = [False for _ in range(n)]
        def dfs(index: int, email_set: set[str]):
            if visited[index]:
                return
            for i in range(1, len(accounts[index])):
                email_set.add(accounts[index][i])
            visited[index] = True

            for next_index in path_sets[index]:
                dfs(next_index, email_set)

        result: list[list[str]] = []
        for i in range(n):
            if visited[i]:
                continue
            result_item = [accounts[i][0]]
            cur_set: set[str] = set()
            dfs(i, cur_set)
            email_list = list(cur_set)
            email_list.sort()
            # print(email_list, result_item)
            result_item.extend(email_list)
            result.append(result_item)
            # print(result_item, result)

        return result
