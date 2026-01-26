#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <queue>
#include <iostream>

using namespace std;
class Solution {
public:
    int minimumPrefixLength(vector<int>& nums) {
        int size = nums.size();
        int res = size - 1;
        for (int i = size - 2; i >= 0; i--) {
            if (nums[i] < nums[i + 1]) {
                res--;
            }
            else {
                return res;
            }
        }
        return res;
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
    // int res = (new Solution())->minimumDifference(nums, n);

    // cout << nums << endl;
    // copy(res.begin(), res.end(), ostream_iterator<int>(cout, " "));
    return 0;
}
