#include <vector>
#include <algorithm>
#include <unordered_map>
#include <unordered_set>
#include <queue>
#include <iostream>

using namespace std;

/**
 * We only have n nums, so we can simply use each digit of res to make sure
 * res is different from each num in nums.
 * For example, if nums[0][0] is '0', we can set res[0] to '1' to make sure res is different from nums[0].
 * If nums[1][1] is '1', we can set res[1] to '0' to make sure res is different from nums[1].
 * So on and so forth.
 */

// t N, s 1
class Solution {
public:
    string findDifferentBinaryString(vector<string>& nums) {
        int n = nums.size();
        string res(n, '0');
        for (int i = 0; i < n; ++i) {
            res[i] = (nums[i][i] == '0') ? '1' : '0';
        }
        return res;
    }
};


// t N^2, s N^2
class SolutionOld {
private:
    bool dfs(unordered_set<string>& s_set, string& res, int n, int deep) {
        if (deep >= n) {
            return s_set.count(res) == 0;
        }
        if (dfs(s_set, res, n, deep + 1)) {
            return true;
        }
        res[deep] = '1';
        if (dfs(s_set, res, n, deep + 1)) {
            return true;
        }
        return false;
    }
public:
    string findDifferentBinaryString(vector<string>& nums) {
        int n = nums.size();
        unordered_set<string> s_set = unordered_set<string>(n);
        for (const auto& n: nums) {
            s_set.insert(n);
        }
        string res = string(n, '0');

        dfs(s_set, res, n, 0);
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
    vector<string> v2 = {"01", "10"};
    vector<int> v3 = {1,8,6,2,5,4,8,3,7};
    auto res = (new Solution())->findDifferentBinaryString(v2);
    // vector<int> v3 = {30,40,42,19,50,8,23,33,25,6};
    // long long res = (new Solution())->minimumCost(v3, 7, 6);
    // vector<int> v3 = {2,2097152,4194304,1,16,65536,512,8388608,536870912,67108864,524288,268435456,256,16777216,8,1048576,4,16384,262144,1024,64,33554432,32,128,134217728,32768,8192,131072,2048,4096};
    // long long res = (new Solution())->minimumCost(v3, 15, 15);

    return 0;
}