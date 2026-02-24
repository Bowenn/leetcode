#include <vector>
#include <algorithm>
#include <unordered_map>
#include <unordered_set>
#include <queue>
#include <iostream>
#include <string_view>
#include <array>

using namespace std;
class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        long long total = 1;
        int zeroPos = -1;
        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] == 0) {
                if (zeroPos >= 0) {
                    return vector<int>(nums.size(), 0);
                }
                zeroPos = i;
                continue;
            }
            total *= nums[i];
        }
        if (zeroPos >= 0) {
            vector<int> res = vector<int>(nums.size(), 0);
            res[zeroPos] = total;
            return res;
        }
        vector<int> res = vector<int>(nums.size());
        for (int i = 0; i < nums.size(); i++) {
            res[i] = total / nums[i];
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
    vector<char> v2 = {'b','c','b','e','b','e'};
    vector<int> v3 = {1,3,2,6,4,2};
    vector<string> strs = {"act","pots","tops","cat","stop","hat"};
    Solution s = Solution();
    string c = "wdw";
    vector<int> res = s.productExceptSelf(v3);
    // vector<int> v3 = {30,40,42,19,50,8,23,33,25,6};
    // long long res = (new Solution())->minimumCost(v3, 7, 6);
    // vector<int> v3 = {2,2097152,4194304,1,16,65536,512,8388608,536870912,67108864,524288,268435456,256,16777216,8,1048576,4,16384,262144,1024,64,33554432,32,128,134217728,32768,8192,131072,2048,4096};
    // long long res = (new Solution())->minimumCost(v3, 15, 15);

    return 0;
}
