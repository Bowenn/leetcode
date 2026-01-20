#include <iostream>
#include <vector>
#include <map>

using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        map<int, int> valueGapMap;
        valueGapMap[target - nums[0]] = 0;
        for (int i = 1; i < nums.size(); i++)
        {
            map<int, int>::iterator findRes = valueGapMap.find(nums[i]);
            if (findRes == valueGapMap.end()) {
                valueGapMap[target - nums[i]] = i;
            }
            else {
                return {valueGapMap[nums[i]], i};
            }

            // exception always cost more time
            //
            // try {
            //     int index = valueGapMap.at(nums[i]);
            //     return {index, i};
            // }
            // catch (const out_of_range& e) {
            //     valueGapMap[target - nums[i]] = i;
            // }
        }
        return {0, 0};
    }
};

int main(){
    vector<int> nums = {2, 3, 5, 7, 11, 13, 31};
    vector<int> res = (new Solution())->twoSum(nums, 16);

    copy(res.begin(), res.end(), ostream_iterator<int>(cout, " "));
    return 0;
}
