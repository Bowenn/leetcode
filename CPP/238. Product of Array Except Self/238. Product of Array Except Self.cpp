
#include <vector>
#include <algorithm>
#include <unordered_map>
#include <unordered_set>
#include <queue>
#include <iostream>

using namespace std;

class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        long long total = 1;
        int zeroPos = -1;
        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] == 0) {
                if (zeroPos >= 0) {
                    return vector<int>(nums.size(), 0);
                }
                zeroPos = i;
                continue;
            }
            total *= nums[i];
        }
        if (zeroPos >= 0) {
            vector<int> res = vector<int>(nums.size(), 0);
            res[zeroPos] = total;
            return res;
        }
        vector<int> res = vector<int>(nums.size());
        for (int i = 0; i < nums.size(); i++) {
            res[i] = total / nums[i];
        }
        return res;
    }
};
