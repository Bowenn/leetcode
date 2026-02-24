
#include <vector>
#include <algorithm>
#include <unordered_map>
#include <unordered_set>
#include <queue>
#include <iostream>

using namespace std;

class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        unordered_map<int, int> nums_counts;
        nums_counts.reserve(nums.size());
        for (auto &n: nums) {
            nums_counts[n]++;
        }
        vector<pair<int, int>> nums_counts_vec;
        nums_counts_vec.reserve(nums_counts.size());
        for (auto &p: nums_counts) {
            nums_counts_vec.push_back(p);
        }
        sort(nums_counts_vec.begin(), nums_counts_vec.end(), [](const auto &a, const auto &b) {
            return a.second > b.second;
        });
        vector<int> res = vector<int>(k);
        for (int i = 0; i < k; i++) {
            res[i] = nums_counts_vec[i].first;
        }

        return res;
    }
};
