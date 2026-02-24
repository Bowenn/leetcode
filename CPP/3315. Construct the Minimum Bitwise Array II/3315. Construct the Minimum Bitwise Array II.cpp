#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <queue>
#include <iostream>

using namespace std;

class Solution {
public:
    vector<int> minBitwiseArray(vector<int>& nums) {
        vector<int> res;
        for (int n: nums) {
            if (n == 2) {
                res.push_back(-1);
                continue;
            }

            int count = 0;
            while (n % 2) {
                count++;
                n >>= 1;
            }

            n <<= 1;
            n += 1;

            while (count > 1) {
                n <<= 1;
                count--;
            }

            res.push_back(n - 1);
        }

        return res;
    }
};

int main(){
    vector<int> nums = {2,3,5,7};
    // int n = 88;
    vector<int> res = (new Solution())->minBitwiseArray(nums);

    // cout << res << endl;

    copy(res.begin(), res.end(), ostream_iterator<int>(cout, " "));
    return 0;
}