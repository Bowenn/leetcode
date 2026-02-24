#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <queue>
#include <iostream>

using namespace std;


// 20ms quicker
class Solution {
private:
    int finalTarget;
    string numsString;
    vector<int> numsArray = {};
    vector<string> results = {};

    /**
     * preResult: result before current number
     * preSign: '-' / '+' / '*' before current number
     * cachedValue: result of '*' before current number
     */
    void walkSubstr(int offset, vector<char>* currentString, int target, long long preResult, char preSign, long long cachedValue) {
        int loopMax = numsArray.size();
        if (numsArray[offset] == 0) {
            loopMax = offset + 1; // leading zero
        }

        int i = 0;
        long long n = 0;
        long long curResult;
        long long curCachedValue;
        while (true) {
            currentString->push_back(numsString[offset + i]);
            n = n * 10 + numsArray[offset + i]; // current number

            if (preSign == '+') {
                curResult = preResult + n;
                curCachedValue = n;
            }
            else if (preSign == '-') {
                curResult = preResult - n;
                curCachedValue = -n;
            }
            else {
                curResult = preResult - cachedValue + cachedValue * n;
                curCachedValue = cachedValue * n;
            }

            if (offset + i == numsArray.size() - 1) {
                if (curResult == target) {
                    results.push_back(string(currentString->begin(), currentString->end()));
                }
                i++;
                break;
            }

            // check +
            currentString->push_back('+');
            walkSubstr(offset + i + 1, currentString, target, curResult, '+', curCachedValue);
            currentString->pop_back();

            // check -
            currentString->push_back('-');
            walkSubstr(offset + i + 1, currentString, target, curResult, '-', curCachedValue);
            currentString->pop_back();

            // check *
            currentString->push_back('*');
            walkSubstr(offset + i + 1, currentString, target, curResult, '*', curCachedValue);
            currentString->pop_back();

            i++;

            if (offset + i >= loopMax) {
                break;
            }
        }

        for (;i > 0; i--) {
            currentString->pop_back();
        }
    }

public:
    vector<string> addOperators(string nums, int target) {
        finalTarget = target;
        numsString = nums;
        for (char &c : nums) {
            numsArray.push_back(c - '0');
        }

        vector<char> charVector;

        walkSubstr(0, &charVector, target, 0, '+', 1);
        

        return results;
    }
};

class SolutionOld {
private:
    int finalTarget;
    string numsString;
    vector<int> numsArray = {};
    /**
     * treat ''/'*'/'+'/'-' operations as four different cases.
     * cachedValueL1 means cached '+' and '-' result
     * cachedSignL1: true means '+', false means '-'
     * cachedValueL2 means cached '*' result
     * cachedSignL2: true means has cache
     */
    vector<string> findResultsNoOp(long current, int offset = 0,
        long cachedValueL1 = 0, bool cachedSignL1 = true,
        long cachedValueL2 = 1, bool cachedSignL2 = false
    ) {
        // no leading zeros
        if (current == 0) {
            return {};
        }

        // if only 1 number left
        if (offset == numsString.length() - 1) {
            current = current * 10 + numsArray[offset];
            if (cachedSignL2) {
                current *= cachedValueL2;
            }
            if (cachedSignL1) {
                if (cachedValueL1 + current == finalTarget) {
                    string result = string(1, numsString[offset]);
                    return {result};
                }
            }
            else {
                if (cachedValueL1 - current  == finalTarget) {
                    string result = string(1, numsString[offset]);
                    return {result};
                }
            }
            return {};
        }
        
        vector<string> results;
        long tempCurrent;

        tempCurrent = current * 10 + numsArray[offset];
        for (string subResult: findResultsNoOp(tempCurrent, offset + 1,
            cachedValueL1, cachedSignL1,
            cachedValueL2, cachedSignL2
        )) {
            subResult.insert(0, 1, numsString[offset]);
            results.push_back(subResult);
        }

        if (cachedSignL2) {
            tempCurrent *= cachedValueL2;
        }
        for (string subResult: findResultsAstOp(tempCurrent, offset + 1,
            cachedValueL1, cachedSignL1
        )) {
            subResult.insert(0, 1, '*');
            subResult.insert(0, 1, numsString[offset]);
            results.push_back(subResult);
        }

        tempCurrent = cachedSignL1 ? (cachedValueL1 + tempCurrent) : (cachedValueL1 - tempCurrent);

        for (string subResult: findResultsAddOp(tempCurrent, offset + 1)) {
            subResult.insert(0, 1, '+');
            subResult.insert(0, 1, numsString[offset]);
            results.push_back(subResult);
        }

        for (string subResult: findResultsMinusOp(tempCurrent, offset + 1)) {
            subResult.insert(0, 1, '-');
            subResult.insert(0, 1, numsString[offset]);
            results.push_back(subResult);
        }

        return results;
    }
    vector<string> findResultsAstOp(long current, int offset = 0,
        long cachedValueL1 = 0, bool cachedSignL1 = true
    ) {
        // if only 1 number left
        if (offset == numsString.length() - 1) {
            current *= numsArray[offset];
            if (cachedSignL1) {
                if (current + cachedValueL1 == finalTarget) {
                    string result = string(1, numsString[offset]);
                    return {result};
                }
            }
            else {
                if (cachedValueL1 - current == finalTarget) {
                    string result = string(1, numsString[offset]);
                    return {result};
                }
            }
            return {};
        }

        vector<string> results;

        for (string subResult: findResultsNoOp(numsArray[offset], offset + 1,
            cachedValueL1, cachedSignL1,
            current, true
        )) {
            subResult.insert(0, 1, numsString[offset]);
            results.push_back(subResult);
        }

        for (string subResult: findResultsAstOp(current * numsArray[offset], offset + 1,
            cachedValueL1, cachedSignL1
        )) {
            subResult.insert(0, 1, '*');
            subResult.insert(0, 1, numsString[offset]);
            results.push_back(subResult);
        }


        long tempCurrent = cachedSignL1
            ? (cachedValueL1 + current * numsArray[offset])
            : (cachedValueL1 - current * numsArray[offset]);
        for (string subResult: findResultsAddOp(tempCurrent, offset + 1)) {
            subResult.insert(0, 1, '+');
            subResult.insert(0, 1, numsString[offset]);
            results.push_back(subResult);
        }

        for (string subResult: findResultsMinusOp(tempCurrent, offset + 1)) {
            subResult.insert(0, 1, '-');
            subResult.insert(0, 1, numsString[offset]);
            results.push_back(subResult);
        }

        return results;
    }
    vector<string> findResultsAddOp(long current, int offset = 0) {
        // if only 1 number left
        if (offset == numsString.length() - 1) {
            if (current + numsArray[offset] == finalTarget) {
                string result = string(1, numsString[offset]);
                return {result};
            }
            return {};
        }

        vector<string> results;

        for (string subResult: findResultsNoOp(numsArray[offset], offset + 1,
            current, true
        )) {
            subResult.insert(0, 1, numsString[offset]);
            results.push_back(subResult);
        }

        for (string subResult: findResultsAstOp(numsArray[offset], offset + 1,
            current, true
        )) {
            subResult.insert(0, 1, '*');
            subResult.insert(0, 1, numsString[offset]);
            results.push_back(subResult);
        }

        for (string subResult: findResultsAddOp(current + numsArray[offset], offset + 1)) {
            subResult.insert(0, 1, '+');
            subResult.insert(0, 1, numsString[offset]);
            results.push_back(subResult);
        }

        for (string subResult: findResultsMinusOp(current + numsArray[offset], offset + 1)) {
            subResult.insert(0, 1, '-');
            subResult.insert(0, 1, numsString[offset]);
            results.push_back(subResult);
        }

        return results;
    }
    vector<string> findResultsMinusOp(long current, int offset = 0) {
        // if only 1 number left
        if (offset == numsString.length() - 1) {
            if (current - numsArray[offset] == finalTarget) {
                string result = string(1, numsString[offset]);
                return {result};
            }
            return {};
        }

        vector<string> results;

        for (string subResult: findResultsNoOp(numsArray[offset], offset + 1,
            current, false
        )) {
            subResult.insert(0, 1, numsString[offset]);
            results.push_back(subResult);
        }

        for (string subResult: findResultsAstOp(numsArray[offset], offset + 1,
            current, false
        )) {
            subResult.insert(0, 1, '*');
            subResult.insert(0, 1, numsString[offset]);
            results.push_back(subResult);
        }

        for (string subResult: findResultsAddOp(current - numsArray[offset], offset + 1)) {
            subResult.insert(0, 1, '+');
            subResult.insert(0, 1, numsString[offset]);
            results.push_back(subResult);
        }

        for (string subResult: findResultsMinusOp(current - numsArray[offset], offset + 1)) {
            subResult.insert(0, 1, '-');
            subResult.insert(0, 1, numsString[offset]);
            results.push_back(subResult);
        }

        return results;
    }
public:
    vector<string> addOperators(string nums, int target) {
        finalTarget = target;
        numsString = nums;
        for (char &c : numsString) {
            numsArray.push_back(c - '0');
        }

        vector<string> results;

        for (string subResult: findResultsAddOp(0, 0)) {
            results.push_back(subResult);
        }

        return results;
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
    // vector<int> nums = {2,3,5,7};
    // string nums = "2357";
    // int n = 88;
    string nums = "105";
    int target = 5;
    vector<string> res = (new Solution())->addOperators(nums, target);

    string nums2 = "1234";
    int target2 = 15;
    vector<string> res2 = (new Solution())->addOperators(nums2, target2);

    // cout << nums << endl;
    // copy(res.begin(), res.end(), ostream_iterator<int>(cout, " "));
    return 0;
}


// s1 = new Set([]);
// s2 = new Set([]);

// s3 = new Set();
// s2.forEach(item => {
//     if (s1.has(item)) {s1.delete(item);} else {s3.add(item);}
// })

// ???
// auto init = atexit([]{ofstream("display_runtime.txt") << '0';});