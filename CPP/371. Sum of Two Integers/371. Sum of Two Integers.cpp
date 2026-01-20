#include <vector>
#include <iostream>

using namespace std;

class Solution {
public:
    int getSum(int a, int b) {
        if (a == 0) {
            return b;
        }
        if (b == 0) {
            return a;
        }

        int xorRes = a ^ b;
        int andRes = (a & b) << 1;

        return getSum(xorRes, andRes);
    }
};

int main(){
    int res = (new Solution())->getSum(2, 3);

    cout << res << endl;
    return 0;
}

//  010
//  011

//  001
//  010 -> 100

//  101
//  000

//  101