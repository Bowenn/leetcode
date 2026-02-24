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
private:
    static constexpr char divider = '#';
public:

    string encode(const vector<string>& strs) {
        size_t total_size = 0;
        for (const string& str : strs) {
            total_size += to_string(str.size()).size() + 1 + str.size();
        }

        string res;
        res.reserve(total_size);
        for (const string& str : strs) {
            res += to_string(str.size());
            res += divider;
            res += str;
        }
        return res;
    }

    vector<string> decode(const string& s) {
        vector<string> res;
        size_t offset = 0;
        while (offset < s.size()) {
            size_t i = offset;
            size_t str_length = 0;
            while (i < s.size() && s[i] != divider) {
                str_length = str_length * 10 + static_cast<size_t>(s[i] - '0');
                ++i;
            }

            const size_t str_start = i + 1;
            res.emplace_back(s, str_start, str_length);
            offset = str_start + str_length;
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
    string res = s.encode(strs);
    vector<string> res2 = s.decode(res);
    // vector<int> v3 = {30,40,42,19,50,8,23,33,25,6};
    // long long res = (new Solution())->minimumCost(v3, 7, 6);
    // vector<int> v3 = {2,2097152,4194304,1,16,65536,512,8388608,536870912,67108864,524288,268435456,256,16777216,8,1048576,4,16384,262144,1024,64,33554432,32,128,134217728,32768,8192,131072,2048,4096};
    // long long res = (new Solution())->minimumCost(v3, 15, 15);

    return 0;
}
