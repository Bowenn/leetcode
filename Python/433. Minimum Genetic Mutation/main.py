from collections import deque

class Solution:
    def minMutation(self, startGene: str, endGene: str, bank: list[str]) -> int:
        c_map = {'A': 0, 'C': 1, 'G': 2, 'T': 3}
        def trans_2_num(gene: str) -> int:
            r = 0
            for c in gene:
                r <<= 2
                r += c_map[c]
            return r
        start_num = trans_2_num(startGene)
        end_num = trans_2_num(endGene)
        bank_nums = set()
        for gene in bank:
            bank_nums.add(trans_2_num(gene))

        # print(start_num, end_num, bank_nums)
        if end_num not in bank_nums:
            return -1
        to_visit: deque[int]= deque()
        to_visit.append(start_num)
        mutation_count = 0
        
        while True:
            round_limit = len(to_visit)
            if round_limit == 0:
                return -1
            for i in range(round_limit):
                visiting = to_visit[0]
                if visiting == end_num:
                    return mutation_count
                to_visit.popleft()

                for j in range(8):
                    change_unit = 1 << j * 2
                    base = (visiting >> (j + 1) * 2 << (j + 1) * 2) + visiting % change_unit
                    for k in range(4):
                        next_num = base + change_unit * k

                        # print(next_num)
                        if next_num in bank_nums:
                            bank_nums.remove(next_num)
                            to_visit.append(next_num)
            mutation_count += 1
            # print(mutation_count, to_visit)

        # return mutation_count
