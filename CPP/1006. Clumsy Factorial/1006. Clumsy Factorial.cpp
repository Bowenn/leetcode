#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <queue>
#include <iostream>

using namespace std;

class Solution {
public:
    int clumsy(int n) {
        // four number each group
        long res = 0;
        switch (n)
        {
            case 1: return 1;
            case 2: return 2;
            case 3: return 6;
            default:
                break;
        }
        
        res = n * (n - 1) / (n - 2);
        int i = n - 3;
        while (i >= 4) {
            res = res + i - (i - 1) * (i - 2) / (i - 3);
            i -= 4;
        }

        switch (i)
        {
            case 0: return res;
            case 1:
            case 2:
            case 3: return res + 1;
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