#include <iostream>
#include <vector>
#include <map>

using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        map<int, int> valueGapMap;
        int midIndex = (numbers.size() - 1) / 2;
        int leftIndex = midIndex, rightIndex = midIndex + 1;

        int currentTotal = numbers[leftIndex] + numbers[rightIndex];
        if (currentTotal == target) {
            return {leftIndex + 1, rightIndex + 1};
        }
        valueGapMap[target - numbers[leftIndex]] = leftIndex;
        valueGapMap[target - numbers[rightIndex]] = rightIndex;

        while (true)
        {
            if (currentTotal > target) {
                leftIndex--;
                auto findRes = valueGapMap.find(numbers[leftIndex]);
                if (findRes == valueGapMap.end()) {
                    valueGapMap[target - numbers[leftIndex]] = leftIndex;
                    currentTotal = numbers[leftIndex] + numbers[rightIndex];
                }
                else {
                    return {leftIndex + 1, valueGapMap[numbers[leftIndex]] + 1};
                }
            }
            else {
                rightIndex++;
                auto findRes = valueGapMap.find(numbers[rightIndex]);
                if (findRes == valueGapMap.end()) {
                    valueGapMap[target - numbers[rightIndex]] = rightIndex;
                    currentTotal = numbers[leftIndex] + numbers[rightIndex];
                }
                else {
                    return {valueGapMap[numbers[rightIndex]] + 1, rightIndex + 1};
                }
            }
        }
    }
};

// no need to think too much
// just calculate from left and right is ok
class FasterSolution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        int start = 0, end = numbers.size() -1;
        while (start < end){
            int sum = numbers[start]+ numbers[end];
            if (sum ==target){
                return{start +1 ,end + 1};

            }else if (sum<target){
                start++;
            }else{
                end--;
            }
        }
        return {0};
    }
};

int main(){
    vector<int> nums = {2, 3, 5, 7, 11, 13, 31};
    vector<int> res = (new Solution())->twoSum(nums, 16);

    copy(res.begin(), res.end(), ostream_iterator<int>(cout, " "));
    return 0;
}