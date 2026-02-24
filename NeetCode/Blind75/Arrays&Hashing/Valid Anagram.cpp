#include <vector>
#include <algorithm>
#include <unordered_map>
#include <unordered_set>
#include <queue>
#include <iostream>

using namespace std;
class Solution {
public:
    bool isAnagram(string s, string t) {
        unordered_map<int, int> c_counts = unordered_map<int, int>();
        for (char c: s) {
            c_counts[c]++;
        }
        for (char c: t) {
            c_counts[c]--;
        }
        for (auto p: c_counts) {
            if (p.second != 0) {
                return false;
            }
        }
        return true;
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
    long long res = (new Solution())->isAnagram("awfawdawd", "fwdadwafa");
    // vector<int> v3 = {30,40,42,19,50,8,23,33,25,6};
    // long long res = (new Solution())->minimumCost(v3, 7, 6);
    // vector<int> v3 = {2,2097152,4194304,1,16,65536,512,8388608,536870912,67108864,524288,268435456,256,16777216,8,1048576,4,16384,262144,1024,64,33554432,32,128,134217728,32768,8192,131072,2048,4096};
    // long long res = (new Solution())->minimumCost(v3, 15, 15);

    return 0;
}