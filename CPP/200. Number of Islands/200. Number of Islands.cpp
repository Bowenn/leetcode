#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <queue>
#include <iostream>

using namespace std;

class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        int res = 0;
        int y = grid.size();
        int x = grid[0].size();
        queue<int> toCheckY;
        queue<int> toCheckX;
        for (int i = 0; i < y; i++) {
            for (int j = 0; j < x; j++) {
                if (grid[i][j] == '1') {
                    grid[i][j] = '0';
                    toCheckX.push(j);
                    toCheckY.push(i);
                    while (!toCheckX.empty()) {
                        int curX = toCheckX.front();
                        int curY = toCheckY.front();
                        toCheckX.pop();
                        toCheckY.pop();
                        if (curX > 0 && grid[curY][curX - 1] == '1') {
                            grid[curY][curX - 1] = '0';
                            toCheckX.push(curX - 1);
                            toCheckY.push(curY);
                        }
                        if (curX < x - 1 && grid[curY][curX + 1] == '1') {
                            grid[curY][curX + 1] = '0';
                            toCheckX.push(curX + 1);
                            toCheckY.push(curY);
                        }
                        if (curY > 0 && grid[curY - 1][curX] == '1') {
                            grid[curY - 1][curX] = '0';
                            toCheckX.push(curX);
                            toCheckY.push(curY - 1);
                        }
                        if (curY < y - 1 && grid[curY + 1][curX] == '1') {
                            grid[curY + 1][curX] = '0';
                            toCheckX.push(curX);
                            toCheckY.push(curY + 1);
                        }
                        res++;
                    }
                }
            }
        }

        return res;
    }
};

class SolutionOld {
private:
    struct pair_hash {
        template <class T1, class T2>
        std::size_t operator() (const std::pair<T1, T2>& pair) const {
            auto hash1 = std::hash<T1>{}(pair.first);
            auto hash2 = std::hash<T2>{}(pair.second);
            return hash1 * 500 + hash2;
        }
    };
public:
    int numIslands(vector<vector<char>>& grid) {
        int res = 0;
        unordered_set<pair<int, int>, pair_hash> unVisited;
        unordered_set<pair<int, int>, pair_hash> toVisit;
        int y = grid.size();
        int x = grid[0].size();
        for (int i = 0; i < y; i++) {
            for (int j = 0; j < x; j++) {
                if (grid[i][j] == '1') {
                    unVisited.insert({i, j});
                }
            }
        }

        while (!unVisited.empty()) {
            pair<int, int> position = *unVisited.begin();
            toVisit.insert(position);
            unVisited.erase(position);
            while (!toVisit.empty()) {
                position = *toVisit.begin();
                toVisit.erase(position);
                if (unVisited.count({position.first - 1, position.second})) {
                    unVisited.erase({position.first - 1, position.second});
                    toVisit.insert({position.first - 1, position.second});
                }
                if (unVisited.count({position.first + 1, position.second})) {
                    unVisited.erase({position.first + 1, position.second});
                    toVisit.insert({position.first + 1, position.second});
                }
                if (unVisited.count({position.first, position.second - 1})) {
                    unVisited.erase({position.first, position.second - 1});
                    toVisit.insert({position.first, position.second - 1});
                }
                if (unVisited.count({position.first, position.second + 1})) {
                    unVisited.erase({position.first, position.second + 1});
                    toVisit.insert({position.first, position.second + 1});
                }
            }
            res++;
        }

        return res;
    }
};

int main(){
    vector<vector<char>> nums = {
        {'1','1','0','0','0'},
        {'1','1','0','0','0'},
        {'0','0','1','0','0'},
        {'0','0','0','1','1'}
    };
    // vector<int> nums = {2,3,5,7};
    // int n = 88;
    int res = (new Solution())->numIslands(nums);

    cout << res << endl;
    // copy(res.begin(), res.end(), ostream_iterator<int>(cout, " "));
    return 0;
}