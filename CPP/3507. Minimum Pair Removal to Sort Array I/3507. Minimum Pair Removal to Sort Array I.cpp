#include <vector>
#include <iostream>

using namespace std;

class Solution {

public:
    int minimumPairRemoval(vector<int>& nums) {
        int res = 0;

        vector<int> numsCopy = vector<int>(nums);
        vector<int> numsSum;
        int minSumIndex = 0;
        int left = 0;

        bool sorted = true;
        for (int i = 0; i < numsCopy.size() - 1; i++) {
            if (sorted && numsCopy[i + 1] < numsCopy[i]) {
                sorted = false;
                left = i;
            }
            int sum = numsCopy[i] + numsCopy[i + 1];
            numsSum.push_back(sum);
            if (sum < numsSum[minSumIndex]) {
                minSumIndex = i;
            }
        }

        while(!sorted) {
            res++;
            int removedNum1 = numsCopy[minSumIndex];
            int removedNum2 = numsCopy[minSumIndex + 1];
            auto pos = numsCopy.begin() + minSumIndex;
            numsCopy.erase(pos);
            numsCopy.erase(pos);
            numsCopy.insert(pos, numsSum[minSumIndex]);
            if (left > minSumIndex - 1) {
                left = minSumIndex - 1;
            }
            auto sumPos = numsSum.begin() + minSumIndex;
            if (minSumIndex > 0) {
                numsSum[minSumIndex - 1] += removedNum2;
            }
            if (minSumIndex < numsSum.size() - 1) {
                numsSum[minSumIndex + 1] += removedNum1;
            }
            numsSum.erase(sumPos);

            sorted = true;
            minSumIndex = 0;
            for (int i = 0; i < numsCopy.size() - 1; i++) {
                if (i >= left && sorted && numsCopy[i + 1] < numsCopy[i]) {
                    sorted = false;
                    left = i;
                }
                if (numsSum[i] < numsSum[minSumIndex]) {
                    minSumIndex = i;
                }
            }
        }

        return res;
    }
};


// just do not copy the nums array if not necessary, -3ms🤔

class FasterSolution {

public:
    int minimumPairRemoval(vector<int>& nums_) {
        if (nums_.size() <= 1) return 0;

        int res = 0;

        int minSum = nums_[0] + nums_[1];
        int minSumIndex = 0;
        int left = 0;

        bool sorted = true;
        for (int i = 0; i < nums_.size() - 1; i++) {
            if (sorted && nums_[i + 1] < nums_[i]) {
                sorted = false;
                left = i;
            }
            int sum = nums_[i] + nums_[i + 1];
            if (sum < minSum) {
                minSum = sum;
                minSumIndex = i;
            }
        }

        while(!sorted) {
            res++;
            auto pos = nums_.begin() + minSumIndex;
            nums_.erase(pos);
            nums_.erase(pos);
            nums_.insert(pos, minSum);
            if (left > minSumIndex - 1) {
                left = minSumIndex - 1;
            }
            if (nums_.size() == 1) {
                return res;
            }

            minSum = nums_[0] + nums_[1];
            minSumIndex = 0;
            sorted = true;
            for (int i = 0; i < nums_.size() - 1; i++) {
                if (i >= left && sorted && nums_[i + 1] < nums_[i]) {
                    sorted = false;
                    left = i;
                }
                int sum = nums_[i] + nums_[i + 1];
                if (sum < minSum) {
                    minSum = sum;
                    minSumIndex = i;
                }
            }
        }

        return res;
    }
};

int main(){
    // vector<int> nums = {-2,1,2,-1,-1,-2,-2,-1,-1,1,1};
    vector<int> nums = {5, 2, 10, 3, 1};
    int res = (new Solution())->minimumPairRemoval(nums);

    cout << res << endl;

    // copy(res.begin(), res.end(), ostream_iterator<int>(cout, " "));
    return 0;
}

/*
[2,2,-1,3,-2,2,1,1,1,0,-1]
[2,2,-1,3,-2,2,1,1,1,-1]
[2,2,-1,3,0,1,1,1,-1]
[2,2,-1,3,0,1,1,0]
[2,1,3,0,1,1,0]
[2,1,3,1,1,0]
[2,1,3,1,1]
[2,1,3,2]
[3,3,2]
[3,5]
*/