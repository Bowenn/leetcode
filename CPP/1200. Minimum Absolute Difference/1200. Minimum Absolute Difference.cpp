#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <queue>
#include <iostream>

using namespace std;
class Solution {
public:
    vector<vector<int>> minimumAbsDifference(vector<int>& arr) {
        sort(arr.begin(), arr.end());
        vector<vector<int>> res;
        int minDiff = arr[1] - arr[0];
        for(int i = 0; i < arr.size() - 1; i++) {
            int diff = arr[i + 1] - arr[i];
            if (diff == minDiff) {
                res.push_back({arr[i], arr[i + 1]});
            }
            else if (diff < minDiff) {
                minDiff = diff;
                res = {};
                res.push_back({arr[i], arr[i + 1]});
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
    int m = 4;
    int n = 2;
    vector<vector<int>> res = (new Solution())->minimumAbsDifference(nums);

    return 0;
}
