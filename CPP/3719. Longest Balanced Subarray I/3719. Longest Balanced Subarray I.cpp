#include <vector>
#include <algorithm>
#include <unordered_map>
#include <unordered_set>
#include <queue>
#include <iostream>

using namespace std;
class Solution {
public:
    int longestBalanced(vector<int>& nums) {
        int res = 0;
        unordered_map<int, int> lastNumIndexMap;
        vector<int> balanceResultVec = vector<int>(nums.size(), 0);

        lastNumIndexMap[nums[0]] = 0;
        balanceResultVec[0] = nums[0] % 2 ? 1 : -1; // odd num add 1, even num add -1

        for (int i = 1; i < nums.size(); i++) {
            int mostRightIndex = lastNumIndexMap[nums[i]];
            if (mostRightIndex == 0 && nums[i] != nums[0]) {
                mostRightIndex = -1;
            }
            lastNumIndexMap[nums[i]] = i;

            int toAdd = nums[i] % 2 ? 1 : -1; // odd num add 1, even num add -1
            for (int j = 0; j <= i; j++) {
                if (j > mostRightIndex) {
                    balanceResultVec[j] += toAdd;
                }
                if (balanceResultVec[j] == 0) {
                    res = max(res, i - j + 1);
                }
            }
        }

        return res;
    }
};

int main(){
    // vector<vector<int>> edges = {
    //     {0,2,1},
    //     {2,1,1},
    //     {1,3,1},
    //     {2,3,3},
    // };
    // vector<int> nums = {1, 21, 2};
    // string nums = "2357";
    int n = 4;
    // vector<char> v1 = {'a','b','c','c','e','d'};
    // vector<char> v2 = {'b','c','b','e','b','e'};
    vector<int> v3 = {1,3,2,6,4,2};
    long long res = (new Solution())->longestBalanced(v3);
    // vector<int> v3 = {30,40,42,19,50,8,23,33,25,6};
    // long long res = (new Solution())->minimumCost(v3, 7, 6);
    // vector<int> v3 = {2,2097152,4194304,1,16,65536,512,8388608,536870912,67108864,524288,268435456,256,16777216,8,1048576,4,16384,262144,1024,64,33554432,32,128,134217728,32768,8192,131072,2048,4096};
    // long long res = (new Solution())->minimumCost(v3, 15, 15);

    return 0;
}
/**
 * First, we have n numbers, and we can get about half of n^2 subarrays. But it will cost too much for us to simply check each subarray.
 * Instead, we can use an int to record the current balance condition of the subarray starting from each number. And we add or minus 1 when we add a new number to it.
 * Every time we have a balance result of 0, we get a balanced subarray. By doing this, we can significantly reduce the time cost.
 * 
 * But now we have a new problem that we may meet repeated numbers.
 * Then I find out an optimized way to solve this, using a map to record the rightmost index of each number.
 * We can know that if a subarray starts before that index, the current number is a repeated number to it.
 * Finally, we can get the length of the longest balanced subarray in O(n^2) time.
 */