#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    vector<int> minBitwiseArray(vector<int>& nums) {
        vector<int> ans;
        for (size_t i = 0; i < nums.size(); i++)
        {
            int temp = nums[i];
            if (temp % 2)
            {
                for (size_t j = 0;; j++)
                {
                    temp >>= 1;
                    if (!(temp % 2)) {
                        ans.push_back(nums[i] - (1 << j));
                        break;
                    }
                }
                
            }
            else
            {
                ans.push_back(-1);
            }
        }
        return ans;
    }
};

int main(){
    vector<int> nums = {2, 3, 5, 7, 11, 13, 31};
    vector<int> res = (new Solution())->minBitwiseArray(nums);

    copy(res.begin(), res.end(), ostream_iterator<int>(cout, " "));
    return 0;
}

// 11 01 OR 10
// 101
// 100011010111111 100011010011111 OR 100011010100000
// 100010101000001 100010101000000 OR 100010101000001

