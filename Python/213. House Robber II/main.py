class Solution:
    def rob(self, nums: list[int]) -> int:
        # f(i): rob nums[i],                        g(i): not rob nums[i]
        #
        # f(i) = g(i - 1) + nums[i]
        # g(i) = max(f(i - 1), g(i - 1))
        #
        # result = f(n) if (nums[0] is robbed) else g(n)

        # f1(i): rob nums[0] and rob nums[i],       g1(i): rob nums[0] and not rob nums[i]
        # f2(i): not rob nums[0] and rob nums[i],   g2(i): not rob nums[0] and not rob nums[i]
        if len(nums) == 1:
            return nums[0]

        f1 = nums[0] # f1(1)
        g1 = nums[0] # g1(1)
        f2 = nums[1] # f2(1)
        g2 = 0       # g2(1)

        for i in range(2, len(nums)):
            new_g1 = max(f1, g1)
            f1 = g1 + nums[i]
            g1 = new_g1

            new_g2 = max(f2, g2)
            f2 = g2 + nums[i]
            g2 = new_g2
        
        return max(g1, f2, g2)
