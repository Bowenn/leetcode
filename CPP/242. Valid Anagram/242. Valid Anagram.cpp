#include <vector>
#include <algorithm>
#include <unordered_map>
#include <unordered_set>
#include <queue>
#include <iostream>

using namespace std;

class Solution {
public:
    bool isAnagram(string s, string t) {
        unordered_map<int, int> c_counts = unordered_map<int, int>();
        for (char c: s) {
            c_counts[c]++;
        }
        for (char c: t) {
            c_counts[c]--;
        }
        for (auto p: c_counts) {
            if (p.second != 0) {
                return false;
            }
        }
        return true;
        
    }
};