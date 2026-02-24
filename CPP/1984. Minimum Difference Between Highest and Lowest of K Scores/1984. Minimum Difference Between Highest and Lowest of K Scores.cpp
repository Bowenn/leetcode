#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <queue>
#include <iostream>

using namespace std;

class Solution {
public:
    int minimumDifference(vector<int>& nums, int k) {
        sort(nums.begin(), nums.end());
        int minGap = nums[k - 1] - nums[0];
        for (int i = 1; k - 1 + i < nums.size(); i++) {
            minGap = min(minGap, nums[k - 1 + i] - nums[i]);
        }
        return minGap;
    }
};

int main(){
    // vector<vector<int>> grid = {
    //     {0,0,1,0,0,0,0,1,0,0,0,0,0},
    //     {0,0,0,0,0,0,0,1,1,1,0,0,0},
    //     {0,1,1,0,1,0,0,0,0,0,0,0,0},
    //     {0,1,0,0,1,1,0,0,1,0,1,0,0},
    //     {0,1,0,0,1,1,0,0,1,1,1,0,0},
    //     {0,0,0,0,0,0,0,0,0,0,1,0,0},
    //     {0,0,0,0,0,0,0,1,1,1,0,0,0},
    //     {0,0,0,0,0,0,0,1,1,0,0,0,0},
    // };
    vector<int> nums = {1, 21, 2};
    // string nums = "2357";
    int n = 2;
    int res = (new Solution())->minimumDifference(nums, n);

    // cout << nums << endl;
    // copy(res.begin(), res.end(), ostream_iterator<int>(cout, " "));
    return 0;
}
