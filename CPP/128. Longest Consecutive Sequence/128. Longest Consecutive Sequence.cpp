
#include <vector>
#include <algorithm>
#include <unordered_map>
#include <unordered_set>
#include <queue>
#include <iostream>

using namespace std;

class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        unordered_map<int, int> consecutive_map;
        unordered_set<int> num_set;
        consecutive_map.reserve(nums.size());
        num_set.reserve(nums.size());
        for (const auto &n: nums) {
            if (num_set.count(n)) {
                continue;
            }
            num_set.insert(n);
            consecutive_map[n] = 1;
            if (consecutive_map.count(n - 1)) {
                int head = n - consecutive_map[n - 1];
                int tail = n;
                if (head < n - 1) {
                    consecutive_map.erase(n - 1);
                }
                consecutive_map[head] = tail - head + 1;
                consecutive_map[tail] = tail - head + 1;
            }
            if (consecutive_map.count(n + 1)) {
                int head = n - consecutive_map[n] + 1;
                int tail = n + consecutive_map[n + 1]; 
                if (n + 1 < tail) {
                    consecutive_map.erase(n + 1);
                }
                if (n > head) {
                    consecutive_map.erase(n);
                }
                consecutive_map[head] = tail - head + 1;
                consecutive_map[tail] = tail - head + 1;
            }
        }

        int res = 0;
        for (const auto &pair: consecutive_map) {
            res = max(res, pair.second);
        }

        return res;
    }
};
