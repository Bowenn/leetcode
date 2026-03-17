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

class Solution4 {
public:
    int characterReplacement(string s, int k) {
        if (s.length() - 1 <= k) {
            return s.length();
        }
        int res = 0;
        vector<vector<int>> c_vec = vector<vector<int>>(26, vector<int>(3, 0)); // cur_length, k_left, l
        for (int j = 0; j < 26; j++) {
            c_vec[j][1] = k;
        }
        for (int i = 1; i < s.length(); i++) {
            int cur_c = s[i] - 'A';

            for (int j = 0; j < 26; j++) {
                if (j == cur_c) {
                    c_vec[j][0]++;
                }
                else {
                    if (c_vec[j][1] > 0) {
                        c_vec[j][1]--;
                        c_vec[j][0]++;
                    }
                    else {
                        res = max(res, c_vec[j][0]);
                        int l = c_vec[j][2];
                        while (s[l] - 'A' == j) {
                            l++;
                        }
                        l++;
                        c_vec[j][2] = l;
                        c_vec[j][0] = i - l;
                    }
                }
            }
        }

        return res;
    }
};

class Solution3 {
private:
    int longestCharacterWithGap(const vector<int> &c_vec, const int k, const int s_length) {
        int k_left = k;
        int max_length = 0;
        int cur_length = c_vec[2];
        int left_gap = c_vec[1];
        if (left_gap <= k_left) {
            max_length = cur_length + left_gap;
        }
        else {
            max_length = cur_length + k;
        }
        int l = 0;
        int r = 1;
        while (true) {
            if (r * 2 + 1 >= c_vec.size()) {
                int right_gap = s_length - 1 - c_vec[0];
                if (left_gap + right_gap >= k_left) {
                    max_length = max(max_length, cur_length + k_left);
                }
                else {
                    max_length = max(max_length, cur_length + left_gap + right_gap);
                }
                break;
            }
            int next_gap = c_vec[r * 2 + 1];
            int next_length = c_vec[r * 2 + 2];
            if (next_gap <= k_left) {
                cur_length += next_gap;
                cur_length += next_length;
                k_left -= next_gap;
                r++;
            }
            else {
                max_length = max(max_length, cur_length + k_left);
                if (r - l == 1) {
                    left_gap = next_gap;
                    cur_length = next_length;
                    l = r;
                    r++;
                }
                else {
                    left_gap = c_vec[l * 2 + 3];
                    cur_length -= c_vec[l * 2 + 2];
                    cur_length -= left_gap;
                    k_left += left_gap;
                    l++;
                }
            }
        }
        return max_length;
    }
public:
    int characterReplacement(string s, int k) {
        if (s.length() - 1 <= k) {
            return s.length();
        }
        int res = 0;
        int i = 0;
        unordered_map<int, vector<int>> c_counts;
        c_counts.reserve(26 * 2);

        c_counts[s[i]] = vector<int>(3, 0); // last shown, [gap, exist]...
        c_counts[s[i]].reserve(s.length());
        c_counts[s[i]][2] = 1;

        i++;
        while (i < s.length()) {
            if (s[i] == s[i - 1]) {
                ++(c_counts[s[i]][c_counts[s[i]].size() - 1]);
                c_counts[s[i]][0] = i;
            }
            else if (c_counts.count(s[i])) {
                c_counts[s[i]].push_back(i - c_counts[s[i]][0] - 1);
                c_counts[s[i]].push_back(1);
                c_counts[s[i]][0] = i;
            }
            else {
                c_counts[s[i]] = vector<int>(3, 0); // last shown, [gap, exist]...
                c_counts[s[i]][0] = i;
                c_counts[s[i]][1] = i;
                c_counts[s[i]][2] = 1;
            }
            i++;
        }

        for (auto const &item: c_counts) {
            int max_length = longestCharacterWithGap(item.second, k, s.length());
            res = max(res, max_length);
        }
        return res;
    }
};

// O(N) time, O(1) space.
class Solution2 {
public:
    int characterReplacement(string s, int k) {
        if (s.length() - 1 <= k) {
            return s.length();
        }
        int res = 0;
        int vec_size = 'Z' - 'A' + 1;
        vector<vector<int>> trans_index = vector<vector<int>>(vec_size, vector<int>(k + 4, 0));
        for (int i = 0; i < s.length(); ++i) {
            int cur_char = s[i] - 'A';
            for (int j = 0; j < vec_size; ++j) {
                if (j == cur_char) {
                    trans_index[j][0] = 1;
                    continue;
                }
                int pos = trans_index[j][1] % (k + 2) + 2;
                trans_index[j][pos] = i;
                trans_index[j][1]++;
                if (trans_index[j][0] && trans_index[j][1] > k) {
                    int next_pos = (pos == k + 3) ? 2 : pos + 1;
                    int length = (trans_index[j][1] == k + 1)
                        ? trans_index[j][pos]
                        : (trans_index[j][pos] - trans_index[j][next_pos] - 1);
                    if (length > res) {
                        res = length;
                    }
                }
            }
        }

        for (int i = 0; i < vec_size; ++i) {
            if (!trans_index[i][0]) {
                continue;
            }
            if (trans_index[i][1] <= k) {
                return s.length();
            }
            int pos = trans_index[i][1] % (k + 2) - 1 - k + 2;
            if (pos <= 1) {
                pos += k + 2;
            }
            int length = s.length() - 1 - trans_index[i][pos];
            if (length > res) {
                res = length;
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