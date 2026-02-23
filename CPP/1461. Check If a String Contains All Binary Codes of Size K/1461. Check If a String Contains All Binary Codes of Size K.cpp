#include <vector>
#include <algorithm>
#include <unordered_map>
#include <unordered_set>
#include <queue>
#include <iostream>

using namespace std;class Solution {
public:
    bool hasAllCodes(string s, int k) {
        long long max = 1 << k;
        vector<bool> k_array = vector<bool>(max, false);
        long long num_left = max;
        int s_length = s.length();
        if (s_length - k + 1 < max) {
            return false;
        }
        int offset = 0;
        long long cur_num = std::stoll(s.substr(offset, k), nullptr, 2);
        while (true) {
            if (cur_num < max) {
                if (!k_array[cur_num]) {
                    k_array[cur_num] = true;
                    num_left--;
                }
            }
            if (num_left == 0) {
                return true;
            }
            offset++;
            if (s_length - (offset + k) + 1 < num_left) {
                return false;
            }
            cur_num <<= 1;
            if (s[offset - 1] == '1') {
                cur_num -= max;
            }
            if (s[offset + k - 1] == '1') {
                cur_num += 1;
            }
        }
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
    bool res = (new Solution())->hasAllCodes("00110", 2);
    // vector<int> v3 = {30,40,42,19,50,8,23,33,25,6};
    // long long res = (new Solution())->minimumCost(v3, 7, 6);
    // vector<int> v3 = {2,2097152,4194304,1,16,65536,512,8388608,536870912,67108864,524288,268435456,256,16777216,8,1048576,4,16384,262144,1024,64,33554432,32,128,134217728,32768,8192,131072,2048,4096};
    // long long res = (new Solution())->minimumCost(v3, 15, 15);

    return 0;
}