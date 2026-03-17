#include <vector>
#include <algorithm>
#include <unordered_map>
#include <unordered_set>
#include <queue>
#include <iostream>

using namespace std;

class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        vector<vector<int>> res = vector<vector<int>>();
        unordered_map<int, int> n_map = unordered_map<int, int>();
        n_map.reserve(nums.size());
        vector<int> n_vec = vector<int>();
        n_vec.reserve(nums.size());
        res.reserve(n_vec.size());
        for (int n: nums) {
            if (!n_map[n]) {
                n_vec.push_back(n);
            }
            n_map[n]++;
        }
        sort(n_vec.begin(), n_vec.end());
        int i = 0;
        int l, r;
        while (true) {
            l = n_map[n_vec[i]] > 1 ? i : i + 1;
            r = n_vec.size() - 1;
            if (i >= n_vec.size() || l > r || l == r && n_map[n_vec[l]] < 2 + (l == i)) {
                break;
            }
            while (true) {
                int cur = n_vec[i] + n_vec[l] + n_vec[r];
                if (cur == 0) {
                    res.push_back({n_vec[i], n_vec[l], n_vec[r]});
                    l++;
                    r--;
                }
                else if (cur > 0) {
                    r--;
                }
                else {
                    l++;
                }
                if (l > r || l == r && n_map[n_vec[l]] < 2 + (l == i)) {
                    break;
                }
            }
            i++;
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
    vector<int> v3 = {-1,0,1,2,-1,-4};
    auto res = (new Solution())->threeSum(v3);
    // vector<int> v3 = {30,40,42,19,50,8,23,33,25,6};
    // long long res = (new Solution())->minimumCost(v3, 7, 6);
    // vector<int> v3 = {2,2097152,4194304,1,16,65536,512,8388608,536870912,67108864,524288,268435456,256,16777216,8,1048576,4,16384,262144,1024,64,33554432,32,128,134217728,32768,8192,131072,2048,4096};
    // long long res = (new Solution())->minimumCost(v3, 15, 15);

    return 0;
}