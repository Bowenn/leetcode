#include <vector>
#include <queue>
#include <functional>
#include <iostream>
#include <unordered_map>

using namespace std;

class Solution {
private:
    void quickSort (vector<int>& nums) { // quick sort
        if (nums.empty()) return;
        function<void(int,int)> qs = [&](int l, int r) {
            if (l >= r) return;
            int i = l, j = r;
            int pivot = nums[l + (r - l) / 2];
            while (i <= j) {
                while (nums[i] < pivot) ++i;
                while (nums[j] > pivot) --j;
                if (i <= j) swap(nums[i++], nums[j--]);
            }
            if (l < j) qs(l, j);
            if (i < r) qs(i, r);
        };

        qs(0, static_cast<int>(nums.size()) - 1);
    }
public:
    long long countOperationsToEmptyArray(vector<int>& nums) {
        unordered_map<int, int> indexMap; // num -> index
        int numsSize = nums.size();

        // sort
        for (int i = 0; i < numsSize; i++) {
            indexMap[nums[i]] = i;
        }
        vector<int> sortedNums = vector<int>(nums);
        quickSort(sortedNums);

        // index map
        queue<int> sortedIndexs;
        for (int n: sortedNums) {
            sortedIndexs.push(indexMap[n]);
        }

        // calculate result
        long long res = 0;
        int largestNumIndex = sortedIndexs.back();
        int removedCount = 0;
        int lastIndex = -1;

        while (!sortedIndexs.empty()) {
            int currentIndex = sortedIndexs.front();
            sortedIndexs.pop();

            // just think of looping as appending another nums vector behind untill all nums removed
            if (currentIndex < lastIndex) {
                res += numsSize - removedCount;
            }

            lastIndex = currentIndex;
            res++;
            removedCount++;
        }

        return res;
    }
};

// just replace sort algorithm with built-in sort
class FasterSolution {
public:
    long long countOperationsToEmptyArray(vector<int>& nums) {
        int numsSize = nums.size();
        vector<pair<int, int>> numIndexPairs;

        // sort
        for (int i = 0; i < numsSize; i++) {
            numIndexPairs.push_back({nums[i], i});
        }
        sort(numIndexPairs.begin(), numIndexPairs.end());

        // calculate result
        long long res = 0;
        int removedCount = 0;
        int lastIndex = -1;

        for (auto& p: numIndexPairs) {
            int currentIndex = p.second;

            // just think of looping as appending another nums vector behind untill all nums removed
            if (currentIndex < lastIndex) {
                res += numsSize - removedCount;
            }

            lastIndex = currentIndex;
            res++;
            removedCount++;
        }

        return res;
    }
};

int main(){
    vector<int> nums = {1,2,4,3};
    long long res = (new Solution())->countOperationsToEmptyArray(nums);

    // copy(res.begin(), res.end(), ostream_iterator<int>(cout, " "));
    cout << res << endl;
    return 0;
}
