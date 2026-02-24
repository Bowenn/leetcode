#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <queue>
#include <iostream>

using namespace std;class Solution {
public:
    int minimumCost(vector<int>& nums) {
        int minInt = INT_MAX;
        int minInt2 = INT_MAX;
        for (int i = 1; i < nums.size(); i++) {
            if (nums[i] < minInt) {
                minInt2 = minInt;
                minInt = nums[i];
            }
            else if (nums[i] < minInt2) {
                minInt2 = nums[i];
            }
        }

        return nums[0] + minInt2 + minInt;
    }
};

int main(){
    vector<vector<int>> edges = {
        {0,2,1},
        {2,1,1},
        {1,3,1},
        {2,3,3},
    };
    // vector<int> nums = {1, 21, 2};
    // string nums = "2357";
    int n = 4;
    vector<char> v1 = {'a','b','c','c','e','d'};
    vector<char> v2 = {'b','c','b','e','b','e'};
    vector<int> v3 = {2,5,5,1,2,20};

    long long res = (new Solution())->minimumCost(v3);

    return 0;
}
