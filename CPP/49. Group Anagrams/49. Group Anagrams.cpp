
#include <vector>
#include <algorithm>
#include <unordered_map>
#include <unordered_set>
#include <queue>
#include <iostream>

using namespace std;

class Solution {
    
private:
    string buildCountKey(const string& str) {
        vector<int> cnt(26, 0);
        for (char c : str) {
            cnt[c - 'a']++;
        }

        string key;
        key.reserve(80);
        for (int n : cnt) {
            key.push_back('#');
            key += to_string(n);
        }
        return key;
    }
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        unordered_map<string, vector<string>> groups;
        groups.reserve(strs.size() * 2 + 1);

        for (const string& str : strs) {
            string key = str;
            sort(key.begin(), key.end());
            groups[key].push_back(str);
        }

        vector<vector<string>> res;
        res.reserve(groups.size());
        for (auto& kv : groups) {
            res.push_back(move(kv.second));
        }
        return res;
    }
};
