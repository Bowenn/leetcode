#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <queue>
#include <iostream>

using namespace std;
class Solution {
public:
    vector<int> rotateElements(vector<int>& nums, int k) {
        queue<int> numQueue;
        queue<int> indexQueue;
        for (int i = 0; i < nums.size(); i++) {
            if (nums[i] >= 0) {
                numQueue.push(nums[i]);
                indexQueue.push(i);
            }
        }
        if (indexQueue.size() <= 1) {
            return nums;
        }
        k = k % indexQueue.size();
        for (int i = 0; i < k; i++) {
            numQueue.push(numQueue.front());
            numQueue.pop();
        }
        while(!indexQueue.empty()) {
            nums[indexQueue.front()] = numQueue.front();
            indexQueue.pop();
            numQueue.pop();
        }

        return nums;
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
