#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <queue>
#include <iostream>

using namespace std;
class Solution {
private:
    long long res = 1;
    void addDigit(int oneCount, int zeroCount, long long nLeft, long long lastCResult) {
        if (!oneCount) {
            for (int i = 0; i < zeroCount; i++) {
                res <<= 1;
            }
            return;
        }
        if (!zeroCount) {
            for (int i = 0; i < zeroCount; i++) {
                res <<= 1;
                res++;
            }
            return;
        }
        long long curCResult = lastCResult * zeroCount / (oneCount + zeroCount);
        // if n == curCResult, n is the largest num presented by curRes followed with 0 and oneCount*1 and (zeroCount-1)*0
        if (nLeft == curCResult) {
            res <<= 1;
            for (int i = 0; i < oneCount; i++) { // k - 1 because res start with 1
                res <<= 1;
                res += 1;
            }
            for (int i = 0; i < zeroCount - 1; i++) {
                res <<= 1;
            }
            return;
        }
        else if (nLeft > curCResult) {
            // add a one and continue
            res <<= 1;
            res++;
            return addDigit(oneCount - 1, zeroCount, nLeft - curCResult, lastCResult - curCResult);
        }
        else {
            // add a zero and continur
            res <<= 1;
            return addDigit(oneCount, zeroCount - 1, nLeft, curCResult);
        }
    }
public:
    long long nthSmallest(long long n, int k) {
        /* find out zero count first */
        int zeroCount = 0;
        long long totalNumCount = 1;
        long long lastTotalNumCount = 0;
        long long numCountWithZero = 1;
        while (n > totalNumCount) {
            zeroCount++;
            numCountWithZero = numCountWithZero * (zeroCount + k - 1) / zeroCount;
            lastTotalNumCount = totalNumCount;
            totalNumCount += numCountWithZero;
        }
        // if n == totalNumCount, n is the largest num presented by k*1 and (m-1)*0
        if (n == totalNumCount) {
            for (int i = 0; i < k - 1; i++) { // k - 1 because res start with 1
                res <<= 1;
                res += 1;
            }
            for (int i = 0; i < zeroCount; i++) {
                res <<= 1;
            }
            return res;
        }

        // choose 1 or 0 by digit
        addDigit(k - 1, zeroCount, n - lastTotalNumCount, numCountWithZero);

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
    // vector<int> nums = {1, 21, 2};
    // string nums = "2357";
    int m = 4;
    int n = 2;
    int res = (new Solution())->nthSmallest(m, n);

    return 0;
}
