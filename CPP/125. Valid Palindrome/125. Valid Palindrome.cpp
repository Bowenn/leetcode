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
