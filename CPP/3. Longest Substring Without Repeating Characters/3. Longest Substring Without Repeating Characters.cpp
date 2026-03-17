#include <vector>
#include <algorithm>
#include <unordered_map>
#include <unordered_set>
#include <queue>
#include <iostream>

using namespace std;
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        if (s.length() < 2) {
            return s.length();
        }
        int res = 1;
        int l = 0;
        unordered_map<char, int> dict;
        dict.reserve(s.length() * 2);
        dict[s[l]] = l;
        for (int i = 1; i < s.length(); i++) {
            if (!dict.count(s[i]) || dict[s[i]] < l) {
                dict[s[i]] = i;
            }
            else {
                res = max(res, i - l);
                l = dict[s[i]] + 1;
                dict[s[i]] = i;
            }
        }
        res = max(res, static_cast<int>(s.length()) - l);

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
    vector<int> v3 = {1,8,6,2,5,4,8,3,7};
    auto res = (new Solution())->lengthOfLongestSubstring("abcabcbb");
    // vector<int> v3 = {30,40,42,19,50,8,23,33,25,6};
    // long long res = (new Solution())->minimumCost(v3, 7, 6);
    // vector<int> v3 = {2,2097152,4194304,1,16,65536,512,8388608,536870912,67108864,524288,268435456,256,16777216,8,1048576,4,16384,262144,1024,64,33554432,32,128,134217728,32768,8192,131072,2048,4096};
    // long long res = (new Solution())->minimumCost(v3, 15, 15);

    return 0;
}