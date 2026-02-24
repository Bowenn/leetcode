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

class SolutionOp {
public:
    // Bucket-sort by frequency.
    // Time: O(n) average, Space: O(n).
    vector<int> topKFrequent(vector<int>& nums, int k) {
        // 1) Count how many times each number appears.
        unordered_map<int, int> nums_counts;
        nums_counts.reserve(nums.size());
        for (int n : nums) {
            nums_counts[n]++;
        }

        // 2) buckets[f] stores all numbers that appear exactly f times.
        // Max possible frequency is nums.size().
        vector<vector<int>> buckets(nums.size() + 1);
        for (const auto& [num, freq] : nums_counts) {
            buckets[freq].push_back(num);
        }

        // 3) Traverse from high frequency to low frequency and collect numbers
        // until we get k elements.
        vector<int> res;
        res.reserve(k);
        for (int freq = static_cast<int>(nums.size()); freq >= 1 && static_cast<int>(res.size()) < k; --freq) {
            for (int num : buckets[freq]) {
                res.push_back(num);
                if (static_cast<int>(res.size()) == k) {
                    break;
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
    vector<char> v2 = {'b','c','b','e','b','e'};
    vector<int> v3 = {1,3,2,6,4,2};
    vector<string> strs = {"act","pots","tops","cat","stop","hat"};
    Solution s = Solution();
    vector<int> res = s.topKFrequent(v3, 3);
    // vector<int> v3 = {30,40,42,19,50,8,23,33,25,6};
    // long long res = (new Solution())->minimumCost(v3, 7, 6);
    // vector<int> v3 = {2,2097152,4194304,1,16,65536,512,8388608,536870912,67108864,524288,268435456,256,16777216,8,1048576,4,16384,262144,1024,64,33554432,32,128,134217728,32768,8192,131072,2048,4096};
    // long long res = (new Solution())->minimumCost(v3, 15, 15);

    return 0;
}
