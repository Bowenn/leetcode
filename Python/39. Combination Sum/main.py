class Solution:
    def combinationSum(self, candidates: list[int], target: int) -> list[list[int]]:
        n = len(candidates)
        candidates.sort(reverse=True)

        def find_list(candidate_index: int, sub_target: int) -> list[list[int]]:
            nonlocal candidates, n
            if sub_target == 0:
                return [[]]
            elif sub_target < 2 or candidate_index >= n:
                return [] # 2 <= candidates[i] <= 40

            result: list[list[int]] = []
            cur_candidate = candidates[candidate_index]

            for i in range(sub_target // cur_candidate + 1):
                sub_result = find_list(candidate_index + 1, sub_target - i * cur_candidate)
                for item in sub_result:
                    item.extend([cur_candidate for _ in range(i)])
                    result.append(item)

            return result

        return find_list(0, target)
