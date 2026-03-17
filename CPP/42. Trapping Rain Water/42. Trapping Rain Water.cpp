#include <vector>
#include <algorithm>
#include <unordered_map>
#include <unordered_set>
#include <queue>
#include <iostream>

using namespace std;
class Solution {
public:
    int trap(vector<int>& height) {
        int res = 0;
        int l = 0;
        int r = height.size() - 1;
        int l_wall_h = height[l];
        int r_wall_h = height[r];

        while (l < r) {
            if (l_wall_h < r_wall_h) {
                l++;
                if (height[l] < l_wall_h) {
                    res += l_wall_h - height[l];
                }
                else {
                    l_wall_h = height[l];
                }
            }
            else {
                r--;
                if (height[r] < r_wall_h) {
                    res += r_wall_h - height[r];
                }
                else {
                    r_wall_h = height[r];
                }
            }
        }

        return res;
    }
};

class SolutionOld {
public:
    int trap(vector<int>& height) {
        int res = 0;
        if (height.size() <= 2) {
            return 0;
        }
        vector<pair<int, int>> h_i = vector<pair<int, int>>(height.size());
        for (int i = 0; i < height.size(); i++) {
            h_i[i] = {i, height[i]};
        }
        sort(h_i.begin(), h_i.end(), [](const auto &a, const auto &b) {
            return a.second > b.second;
        });
        int l, r, h;
        h = h_i[1].second;
        if (h_i[0].first < h_i[1].first) {
            l = h_i[0].first;
            r = h_i[1].first;
        }
        else {
            l = h_i[1].first;
            r = h_i[0].first;
        }
        for (int i = l + 1; i < r; i++) {
            res += h - height[i];
        }
        for (int i = 2; i < height.size(); i++) {
            if (h_i[i].first < l) {
                h = h_i[i].second;
                for (int j = h_i[i].first + 1; j < l; j++) {
                    res += h - height[j];
                }
                l = h_i[i].first;
            }
            else if (h_i[i].first > r) {
                h = h_i[i].second;
                for (int j = h_i[i].first - 1; j > r; j--) {
                    res += h - height[j];
                }
                r = h_i[i].first;
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
    vector<int> v3 = {1,8,6,2,5,4,8,3,7};
    auto res = (new Solution())->trap(v3);
    // vector<int> v3 = {30,40,42,19,50,8,23,33,25,6};
    // long long res = (new Solution())->minimumCost(v3, 7, 6);
    // vector<int> v3 = {2,2097152,4194304,1,16,65536,512,8388608,536870912,67108864,524288,268435456,256,16777216,8,1048576,4,16384,262144,1024,64,33554432,32,128,134217728,32768,8192,131072,2048,4096};
    return 0;
}