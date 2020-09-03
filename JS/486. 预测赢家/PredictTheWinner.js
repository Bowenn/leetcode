/**
 * @param {number[]} nums
 * @return {boolean}
 */

 /* Best Solution 60 ms*/
 /* From `leetCode` By `斯瑞卡默尔`
        【状态定义】
        dp[i][j]表示在nums坐标[i, j]中，玩家1“先手”时能取到的最多分数。

        【状态转移】
        博弈论中的minmax思想：玩家1为了胜利总取max，玩家2为了阻碍玩家1胜利总取min
        dp[i][j]为以下两种情况的最大值：
        - 状态1： 
            玩家1“先手”取最左端的元素nums[i]，此时剩余元素坐标为[i+1, j]。
            玩家2“后手”为了阻碍玩家1的胜利，即使玩家1的得分最少，要在以下两种状态中取min：
                - 状态1.1：玩家2取元素nums[i+1]，导致在下一轮中玩家1最多得分dp[i+2][j]
                - 状态1.2：玩家2取元素nums[j]，导致在下一轮中玩家1最多得分dp[i+1][j-1]
            状态1 = nums[i] + min(状态1.1, 状态1.2)
        - 状态2： 
            玩家1“先手”取最右端的元素nums[j]，此时剩余元素坐标为[i, j-1]。
            玩家2“后手”为了阻碍玩家1的胜利，即使玩家1的得分最少，要在以下两种状态中取min：
                - 状态2.1：玩家2取元素nums[i]，导致在下一轮中玩家1最多得分dp[i+1][j-1]
                - 状态2.2：玩家2取元素nums[j-1]，导致在下一轮中玩家1最多得分dp[i][j-2]
            状态2 = nums[j] + min(状态2.1, 状态2.2)
        - 取最大值：
            玩家1为了胜利在所有状态中取max
            dp[i][j] = max(状态1，状态2)

        【初始值】
        当nums中只有一个元素时：
            dp[i][i] = nums[i]
        当nums中只有两个元素时：
            dp[i][i+1] = max(nums[i], nums[i+1])

        【返回值】
        玩家1在nums中能取到的最多分数是否大于等于玩家2的分数：
            dp[0][len(nums)-1] >= sum(nums) - dp[0][len(nums)-1]
        即是否大于等于总分数的一半：
            dp[0][len(nums)-1] >= sum(nums)/2
    

    区别
        我的getMax函数并没有将值存储，而是每次都递归调用，这样会出现很多重复的情况
        比如在getMax(3, 8)和getMax(4, 9)中都重复使用了getMax(4, 7)和getMax(5, 8)
        这样就多出了一倍的运算量
        本质上区别不大
  */
var PredictTheWinner = function (nums) {
    // dp
    const dp = []
    for (let i = 0; i < nums.length; i++) {
      dp[i] = []
      dp[i][i] = nums[i]
    }
    for (let i = nums.length - 1; i >= 0; i--) {
      for (let j = i + 1; j < nums.length; j++) {
        dp[i][j] = Math.max(nums[i] - dp[i + 1][j], nums[j] - dp[i][j - 1])
      }
    }
    // console.log(dp)
    return dp[0][nums.length - 1] >= 0
  };


 /* My Solution 1.0 一次优化 124 ms*/
var PredictTheWinner1 = function(nums) {
    /* 偶数情况可以保证先手必胜 */
    if (nums.length % 2 === 0) return true;

    /* 将一轮A和B的两次getMax变成只针对A的最大取值的一次计算，并没有减少getMax的调用次数但是时间大幅缩短，有点迷惑 */
    const sum = nums.reduce((s, cur) => s + cur);
    let getMax = (begin, end) => {
        if (begin === end) {
            return nums[begin];
        }
        else if (begin === end - 1) {
            return Math.max(nums[begin], nums[end]);
        }
        else {
            return Math.max(
                nums[begin] + Math.min(getMax(begin + 2, end), getMax(begin + 1, end - 1)),
                nums[end] + Math.min(getMax(begin + 1, end - 1), getMax(begin, end - 2)),
            );
        }
    }

    let a = getMax(0, nums.length - 1);
    return a >= sum / 2;
}


 /* My Solution Base 未优化 316 ms*/
var PredictTheWinner0 = function(nums) {
    const sum = nums.reduce((s, cur) => s + cur);
    let getMax = (begin, end, sum_sub) => {
        if (begin === end) {
            return nums[begin];
        }
        else {
            return sum_sub - Math.min(getMax(begin + 1, end, sum_sub - nums[begin]), getMax(begin, end - 1, sum_sub - nums[end]));
        }
    }
    let a = getMax(0, nums.length - 1, sum);
    return a >= sum / 2;
};