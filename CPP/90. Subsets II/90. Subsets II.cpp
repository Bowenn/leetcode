#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <queue>
#include <iostream>

using namespace std;

class Solution {
public:
    vector<vector<int>> subsetsWithDup(vector<int>& nums) {
        vector<vector<int>> res = {{}}; // empty set
        int numsSize = nums.size();
        unordered_map<int, int> numCounts; // <num, counts> each num how many counts
        for (int num: nums) {
            numCounts[num]++;
        }
        for (auto item: numCounts) {
            vector<vector<int>> temp = res;
            for (int i = 1; i <= item.second; i++) {
                for (vector<int> &s: temp) {
                    s.push_back(item.first);
                    vector<int> toPush = s;
                    res.push_back(toPush);
                }
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
    vector<int> nums = {1, 2, 2};
    // string nums = "2357";
    // int n = 88;
    vector<vector<int>> res = (new Solution())->subsetsWithDup(nums);

    // cout << nums << endl;
    // copy(res.begin(), res.end(), ostream_iterator<int>(cout, " "));
    return 0;
}
