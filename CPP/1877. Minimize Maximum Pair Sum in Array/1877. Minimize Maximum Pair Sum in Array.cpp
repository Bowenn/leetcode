#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <queue>
#include <iostream>

using namespace std;

class Solution {
public:
    int minPairSum(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        int res = 0;
        int size = nums.size();
        for (int i = 0, j = size - 1; i * 2 < size; i++, j--) {
            res = max(res, nums[i] + nums[j]);
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
    vector<int> nums = {2,3,5,7};
    // string nums = "2357";
    // int n = 88;
    int res = (new Solution())->minPairSum(nums);

    // cout << nums << endl;
    // copy(res.begin(), res.end(), ostream_iterator<int>(cout, " "));
    return 0;
}


/** 
 * Math Part:
 * 
 * assume max sum pair (a[m], a[-m])
 * try prove n exist, fullfill
 * a[n] < a[m] < a[-m] < a[-n] OR a[m] < a[n] < a[-n] < a[-m]
 * a[m] + a[n] < a[m] + a[-m] AND a[-m] + a[-n] < a[m] + a[-m]
 */

/*
if
a[m] + a[n] < a[m] + a[-m] AND a[-m] + a[-n] < a[m] + a[-m]

then
a[n] < a[-m] AND a[-n] < a[m]

impossible

so, n does not exist
*/