#include <vector>
#include <algorithm>
#include <unordered_map>
#include <unordered_set>
#include <queue>
#include <iostream>

using namespace std;
class Solution {
public:
    int characterReplacement(string s, int k) {
        if (s.length() - 1 <= k) {
            return s.length();
        }
        int res = 0;
        int max_c = -1;
        vector<int> c_counts = vector<int>(26, 0);
        int l = 0;
        int i = 0;
        int cur_c = s[i] - 'A';
        res = 1;
        c_counts[cur_c] = 1;
        max_c = cur_c;

        for (i = 1; i < s.length(); i++) {
            int cur_c = s[i] - 'A';
            c_counts[cur_c]++;
            if (cur_c == max_c) {
                res = max(res, i - l + 1);
            }
            else {
                if (c_counts[cur_c] > c_counts[max_c]) {
                    max_c = cur_c;
                    res = max(res, i - l + 1);
                }
                else {
                    while (i - l + 1 - c_counts[max_c] > k) {
                        int to_drop = s[l] - 'A';
                        c_counts[to_drop]--;
                        l++;

                        if (to_drop == max_c) {
                            // find new max char
                            for (int j = 0; j < 26; j++) {
                                if (c_counts[j] > c_counts[max_c]) {
                                    max_c = j;
                                }
                            }
                        }
                    }
                    res = max(res, i - l + 1);
                }
            }
        }

        return res;
    }
};
int main(){
    // vector<vector<int>> edges = {
    //     {0,2,1},
    //     {2,1,1},
    //     {1,3,1},
    //     {2,3,3},
    // };
    // vector<int> nums = {1, 21, 2};
    // string nums = "2357";
    int n = 4;
    // vector<char> v1 = {'a','b','c','c','e','d'};
    // vector<char> v2 = {'b','c','b','e','b','e'};
    vector<int> v3 = {1,8,6,2,5,4,8,3,7};
    // auto res = (new Solution())->characterReplacement("IMNJJTRMJEGMSOLSCCQICIHLQIOGBJAEHQOCRAJQMBIBATGLJDTBNCPIFRDLRIJHRABBJGQAOLIKRLHDRIGERENNMJSDSSMESSTR", 2);
    auto res = (new Solution())->characterReplacement("AABABBA", 1);
    // vector<int> v3 = {30,40,42,19,50,8,23,33,25,6};
    // long long res = (new Solution())->minimumCost(v3, 7, 6);
    // vector<int> v3 = {2,2097152,4194304,1,16,65536,512,8388608,536870912,67108864,524288,268435456,256,16777216,8,1048576,4,16384,262144,1024,64,33554432,32,128,134217728,32768,8192,131072,2048,4096};
    // long long res = (new Solution())->minimumCost(v3, 15, 15);

    return 0;
}