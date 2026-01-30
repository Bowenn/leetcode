#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <queue>
#include <iostream>

using namespace std;
class Solution {
private:
    bool optimizeRoad(int size, vector<vector<long long>>& costMap) {
        bool optimizeFound = false;

        for (int i = 0; i < size; i++) {
            for (int j = 0; j < size; j++) {
                if (i == j || costMap[i][j] < 0) {
                    continue;
                }
                for (int k = 0; k < size; k++) {
                    if (k == i || k == j || costMap[j][k] < 0) {
                        continue;

                    }
                    if (costMap[i][k] < 0 || costMap[i][k] > costMap[i][j] + costMap[j][k]) {
                        optimizeFound = true;
                        costMap[i][k] = costMap[i][j] + costMap[j][k];
                    }
                }
            }
        }

        return optimizeFound;
    }
public:
    long long minimumCost(string source, string target, vector<char>& original, vector<char>& changed, vector<int>& cost) {
        unordered_map<char, int> char2Int;
        vector<vector<long long>> costMap;
        int charCount = 0;
        for (int i = 0; i < original.size(); i++) {
            // build new road
            int oriCharInt;
            if (!char2Int.count(original[i])) {
                char2Int[original[i]] = charCount;
                oriCharInt = charCount;
                charCount++;

                for (vector<long long>& v: costMap) {
                    v.push_back(-1);
                }
                costMap.push_back(vector<long long>(charCount, -1));
            }
            else {
                oriCharInt = char2Int[original[i]];
            }

            int chaCharInt;
            if (!char2Int.count(changed[i])) {
                char2Int[changed[i]] = charCount;
                chaCharInt = charCount;
                charCount++;

                for (vector<long long>& v: costMap) {
                    v.push_back(-1);
                }
                costMap.push_back(vector<long long>(charCount, -1));
            }
            else {
                chaCharInt = char2Int[changed[i]];
            }
            
            if (costMap[oriCharInt][chaCharInt] < 0 || costMap[oriCharInt][chaCharInt] > cost[i]) {
                costMap[oriCharInt][chaCharInt] = cost[i];
            }
        }
        
        while(optimizeRoad(charCount, costMap)) {}

        long long result = 0;
        for (int i = 0; i < source.length(); i++) {
            if (target[i] != source[i]) {
                if (!char2Int.count(source[i]) || !char2Int.count(target[i])) {
                    return -1;
                }
                int sourceInt = char2Int[source[i]];
                int targetInt = char2Int[target[i]];
                if (costMap[sourceInt][targetInt] < 0) {
                    return -1;
                }
                result += costMap[sourceInt][targetInt];
            }
        }

        return result;
    }
};

int main(){
    vector<vector<int>> edges = {
        {0,2,1},
        {2,1,1},
        {1,3,1},
        {2,3,3},
    };
    // vector<int> nums = {1, 21, 2};
    // string nums = "2357";
    int n = 4;
    vector<char> v1 = {'a','b','c','c','e','d'};
    vector<char> v2 = {'b','c','b','e','b','e'};
    vector<int> v3 = {2,5,5,1,2,20};

    long long res = (new Solution())->minimumCost("abcd", "acbe",
        v1, v2, v3);

    return 0;
}
