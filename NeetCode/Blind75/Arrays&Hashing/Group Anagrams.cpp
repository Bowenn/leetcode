#include <vector>
#include <algorithm>
#include <unordered_map>
#include <unordered_set>
#include <queue>
#include <iostream>
#include <string_view>
#include <array>

using namespace std;


// 2 ms
class Solution {
struct Node {
    vector<int> c_counts;
    vector<string_view> contains;
    vector<Node> sub_nodes;
};
public:
    void add2Tree(vector<int> &c_counts, string_view &sv, Node &p) {
        if (p.sub_nodes.size() == 0) {
            Node new_node = Node();
            new_node.c_counts = c_counts;
            new_node.contains = vector<string_view>();
            new_node.contains.push_back(sv);
            p.sub_nodes.push_back(new_node);
            return;
        }
        int l = 0;
        int r = p.sub_nodes.size() - 1;
        int c_index = 0;
        while (true) {
            for (int i = l; i <= r; i++) {
                int cur_sub_counts = c_index < p.sub_nodes[i].c_counts.size()
                    ? p.sub_nodes[i].c_counts[c_index]
                    : 0;
                if (cur_sub_counts > c_counts[c_index]) {
                    l = i + 1;
                }
                else if (cur_sub_counts < c_counts[c_index]) {
                    r = i - 1;
                }
            }
            if (l > r) {
                if (l >= p.sub_nodes.size()) {
                    Node new_node = Node();
                    new_node.c_counts = c_counts;
                    new_node.contains = vector<string_view>();
                    new_node.contains.push_back(sv);
                    p.sub_nodes.push_back(new_node);
                    return;
                }
                return add2Tree(c_counts, sv, p.sub_nodes[l]);
            }
            c_index++;
            if (c_index >= c_counts.size()) {
                p.sub_nodes[l].contains.push_back(sv);
                return;
            }
        }
    }
    void walkTree(vector<vector<string>> &res, Node &p) {
        if (p.contains.size()) {
            res.push_back(vector<string>(p.contains.begin(), p.contains.end()));
            for (auto &sv : p.contains) {
                cout << sv << endl;
            }
            for (auto &c : p.c_counts) {
                cout << c << endl;
            }
        }
        for (auto &node : p.sub_nodes) {
            walkTree(res, node);
        }
    }
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        unordered_map<int, int> c_dict = unordered_map<int, int>();
        Node root = Node();
        root.c_counts = {};
        root.contains = vector<string_view>();
        root.sub_nodes = vector<Node>();
        for (int i = 0; i < strs.size(); i++) {
            string_view sv = string_view(strs[i]);
            if (sv.length() == 0) {
                root.contains.push_back(sv);
                continue;
            }
            vector<int> c_counts = vector<int>(c_dict.size(), 0);
            for (char c : sv) {
                if (c_dict.count(c)) {
                    c_counts[c_dict[c]]++;
                }
                else {
                    c_dict[c] = c_counts.size();
                    c_counts.push_back(1);
                }
            }
            add2Tree(c_counts, sv, root);
        }

        vector<vector<string>> res;
        walkTree(res, root);
        return res;
    }
};

class SolutionOp {
public:
    // 3 ms
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        unordered_map<string, vector<string>> groups;
        groups.reserve(strs.size() * 2 + 1);

        for (const string& str : strs) {
            string key = buildCountKey(str);
            groups[key].push_back(str);
        }

        vector<vector<string>> res;
        res.reserve(groups.size());
        for (auto& kv : groups) {
            res.push_back(move(kv.second));
        }
        return res;
    }

    // 2 ms
    vector<vector<string>> groupAnagramsBySort(vector<string>& strs) {
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
    vector<char> v2 = {'b','c','b','e','b','e'};
    vector<int> v3 = {1,3,2,6,4,2};
    vector<string> strs = {"act","pots","tops","cat","stop","hat"};
    vector<vector<string>> res = (new SolutionOp())->groupAnagrams(strs);
    // vector<int> v3 = {30,40,42,19,50,8,23,33,25,6};
    // long long res = (new Solution())->minimumCost(v3, 7, 6);
    // vector<int> v3 = {2,2097152,4194304,1,16,65536,512,8388608,536870912,67108864,524288,268435456,256,16777216,8,1048576,4,16384,262144,1024,64,33554432,32,128,134217728,32768,8192,131072,2048,4096};
    // long long res = (new Solution())->minimumCost(v3, 15, 15);

    return 0;
}
