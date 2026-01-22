#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <queue>
#include <iostream>

using namespace std;

class Solution {
public:
    int countPermutations(vector<int>& complexity) {
        int complextyRoot = complexity[0];
        int decryptableCount = 0;
        for (int i = 1; i < complexity.size(); i++) {
            if (complexity[i] > complextyRoot) {
                decryptableCount++;
            }
            else {
                return 0;
            }
        }

        long res = 1;
        const int MOD = 1e9 + 7;
        for (int i = 0; i < decryptableCount; i++) {
            res = (res * (decryptableCount - i)) % MOD;
        }
        return res;
    }
};

int main(){
    // vector<int> nums = {-2,1,2,-1,-1,-2,-2,-1,-1,1,1};
    vector<int> complexity = {100, 200, 150, 300, 1000, 80, 200};
    int res = (new Solution())->countPermutations(complexity);

    cout << res << endl;

    // copy(res.begin(), res.end(), ostream_iterator<int>(cout, " "));
    return 0;
}