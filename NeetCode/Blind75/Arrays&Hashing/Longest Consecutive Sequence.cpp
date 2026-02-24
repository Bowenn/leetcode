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


// todo wrong?
class SolutionOp {
private:
    // Union-Find helper: find the root with path compression.
    int find(unordered_map<int, int>& parent, int x) {
        if (parent.find(x) == parent.end()) {
            parent[x] = x;
        }
        if (parent[x] != x) {
            parent[x] = find(parent, parent[x]);  // path compression
        }
        return parent[x];
    }

    // Union-Find helper: union two elements, returns new length.
    int unite(unordered_map<int, int>& parent, unordered_map<int, int>& length,
              int x, int y) {
        int root_x = find(parent, x);
        int root_y = find(parent, y);
        if (root_x == root_y) return length[root_x];

        parent[root_y] = root_x;
        length[root_x] += length[root_y];
        return length[root_x];
    }

public:
    // Union-Find approach: O(n α(n)) ≈ O(n) time, O(n) space.
    // Only track numbers that exist; union consecutive pairs.
    int longestConsecutive(vector<int>& nums) {
        if (nums.empty()) return 0;

        unordered_map<int, int> parent;   // parent[x] = root of x
        unordered_map<int, int> length;   // length[root] = chain length from root
        unordered_set<int> num_set(nums.begin(), nums.end());

        int max_len = 1;
        for (int num : num_set) {
            if (parent.find(num) != parent.end()) {
                continue;  // already processed
            }

            parent[num] = num;
            length[num] = 1;

            // Try to merge with num-1 and num+1
            if (num_set.count(num - 1)) {
                max_len = max(max_len, unite(parent, length, num, num - 1));
            }
            if (num_set.count(num + 1)) {
                max_len = max(max_len, unite(parent, length, num, num + 1));
            }
        }

        return max_len;
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
    int res = s.longestConsecutive(v3);
    // vector<int> v3 = {30,40,42,19,50,8,23,33,25,6};
    // long long res = (new Solution())->minimumCost(v3, 7, 6);
    // vector<int> v3 = {2,2097152,4194304,1,16,65536,512,8388608,536870912,67108864,524288,268435456,256,16777216,8,1048576,4,16384,262144,1024,64,33554432,32,128,134217728,32768,8192,131072,2048,4096};
    // long long res = (new Solution())->minimumCost(v3, 15, 15);

    return 0;
}
