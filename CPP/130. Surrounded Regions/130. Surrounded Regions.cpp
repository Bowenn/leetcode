#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <queue>
#include <iostream>

using namespace std;

class Solution {
private:
    int boardYSize;
    int boardXSize;
    void walk(int y, int x, vector<vector<char>>& board, vector<vector<bool>>& visited, bool fromBorder = false) {
        if (y < 0 || y >= boardYSize || x < 0 || x >= boardXSize) {
            return;
        }
        if (visited[y][x]) {
            return;
        }
        visited[y][x] = true;
        if (board[y][x] == 'X') {
            return;
        }
        if (!fromBorder) {
            board[y][x] = 'X';
        }
        walk(y + 1, x, board, visited, fromBorder);
        walk(y - 1, x, board, visited, fromBorder);
        walk(y, x + 1, board, visited, fromBorder);
        walk(y, x - 1, board, visited, fromBorder);
    }
public:
    int solve(vector<vector<char>>& board) {
        boardYSize = board.size();
        boardXSize= board[0].size();
        vector<vector<bool>> visited(boardYSize, vector<bool>(boardXSize, false));

        // walk from border first
        for (int i = 0; i < boardYSize; i++) {
            for (int j: {0, boardXSize - 1}) {
                walk(i, j, board, visited, true);
            }
        }

        for (int i: {0, boardYSize - 1}) {
            for (int j = 1; j < boardXSize - 1; j++) {
                walk(i, j, board, visited, true);
            }
        }

        // then walk the rest (same as q200)
        for (int i = 1; i < boardYSize - 1; i++) {
            for (int j = 1; j < boardXSize - 1; j++) {
                walk(i, j, board, visited);
            }
        }

        return 0;
    }
};

class SolutionOld {
private:
    struct pair_hash {
        template <class T1, class T2>
        std::size_t operator() (const std::pair<T1, T2>& pair) const {
            auto hash1 = std::hash<T1>{}(pair.first);
            auto hash2 = std::hash<T2>{}(pair.second);
            return hash1 * 300 + hash2;
        }
    };
public:
    int solve(vector<vector<char>>& grid) {
        int y = grid.size();
        int x = grid[0].size();
        queue<int> toCheckY;
        queue<int> toCheckX;
        unordered_set<pair<int, int>, pair_hash> restoreRegion;
        for (int i = 0; i < y; i++) {
            for (int j = 0; j < x; j++) {
                if (grid[i][j] == 'O') {
                    bool surrounded = true;
                    unordered_set<pair<int, int>, pair_hash> region;
                    region.insert({i, j});
                    grid[i][j] = 'X';
                    toCheckX.push(j);
                    toCheckY.push(i);
                    while (!toCheckX.empty()) {
                        int curX = toCheckX.front();
                        int curY = toCheckY.front();
                        if (curX == 0 || curX == x - 1 || curY == 0 || curY == y - 1) {
                            // not surrounded
                            surrounded = false;
                        }
                        toCheckX.pop();
                        toCheckY.pop();
                        if (curX > 0 && grid[curY][curX - 1] == 'O') {
                            region.insert({curY, curX - 1});
                            grid[curY][curX - 1] = 'X';
                            toCheckX.push(curX - 1);
                            toCheckY.push(curY);
                        }
                        if (curX < x - 1 && grid[curY][curX + 1] == 'O') {
                            region.insert({curY, curX + 1});
                            grid[curY][curX + 1] = 'X';
                            toCheckX.push(curX + 1);
                            toCheckY.push(curY);
                        }
                        if (curY > 0 && grid[curY - 1][curX] == 'O') {
                            region.insert({curY - 1, curX});
                            grid[curY - 1][curX] = 'X';
                            toCheckX.push(curX);
                            toCheckY.push(curY - 1);
                        }
                        if (curY < y - 1 && grid[curY + 1][curX] == 'O') {
                            region.insert({curY + 1, curX});
                            grid[curY + 1][curX] = 'X';
                            toCheckX.push(curX);
                            toCheckY.push(curY + 1);
                        }
                        if (!surrounded) {
                            restoreRegion.insert(region.begin(), region.end());
                        }
                    }
                }
            }
        }
        for (auto& p : restoreRegion) {
            grid[p.first][p.second] = 'O';
        }
        return 0;
    }
};

int main(){
    vector<vector<char>> chars = {
        {'O','O','X','X','X'},
        {'O','O','X','X','X'},
        {'X','X','O','X','X'},
        {'X','X','X','O','O'}
    };
    // vector<int> nums = {2,3,5,7};
    // int n = 88;
    (new Solution())->solve(chars);

    // cout << nums << endl;
    // copy(chars.begin(), chars.end(), ostream_iterator<int>(cout, " "));
    return 0;
}