#include <vector>
#include <algorithm>
#include <unordered_map>
#include <unordered_set>
#include <queue>
#include <iostream>

using namespace std;
class Solution {
public:
    bool isPalindrome(string s) {
        int l = 0, r = s.length() - 1;
        while (true) {
            while (true) {
                if (s[l] >= 'a' && s[l] <= 'z' || s[l] >= '0' && s[l] <= '9') {
                    break;
                }
                else if (s[l] >= 'A' && s[l] <= 'Z') {
                    s[l] += 32;
                    break;
                }
                else {
                    l++;
                }
                if (l >= r) {
                    return true;
                }
            }
            while (true) {
                if (s[r] >= 'a' && s[r] <= 'z' || s[r] >= '0' && s[r] <= '9') {
                    break;
                }
                else if (s[r] >= 'A' && s[r] <= 'Z') {
                    s[r] += 32;
                    break;
                }
                else {
                    r--;
                }
                if (l >= r) {
                    return true;
                }
            }
            if (s[l] != s[r]) {
                return false;
            }
            l++;
            r--;
        }
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
    vector<int> v3 = {1,3,2,6,4,2};
    long long res = (new Solution())->isPalindrome("awfawdawd");
    // vector<int> v3 = {30,40,42,19,50,8,23,33,25,6};
    // long long res = (new Solution())->minimumCost(v3, 7, 6);
    // vector<int> v3 = {2,2097152,4194304,1,16,65536,512,8388608,536870912,67108864,524288,268435456,256,16777216,8,1048576,4,16384,262144,1024,64,33554432,32,128,134217728,32768,8192,131072,2048,4096};
    // long long res = (new Solution())->minimumCost(v3, 15, 15);

    return 0;
}