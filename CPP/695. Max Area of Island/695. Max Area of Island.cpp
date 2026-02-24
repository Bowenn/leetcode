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
    int walk(int y, int x, vector<vector<int>>& board) {
        if (y < 0 || y >= boardYSize || x < 0 || x >= boardXSize) {
            return 0;
        }
        if (!board[y][x]) {
            return 0;
        }
        board[y][x] = 0;
        return 1 + walk(y + 1, x, board)
                 + walk(y - 1, x, board)
                 + walk(y, x + 1, board)
                 + walk(y, x - 1, board);
    }
public:
    int maxAreaOfIsland(vector<vector<int>>& board) {
        boardYSize = board.size();
        boardXSize= board[0].size();

        int res = 0;
        for (int i = 0; i < boardYSize; i++) {
            for (int j = 0; j < boardXSize; j++) {
                if (board[i][j]) {
                    int area = walk(i, j, board);
                    if (area > res) {
                        res = area;
                    }
                }
            }
        }

        return res;
    }
};

int main(){
    vector<vector<int>> grid = {
        {0,0,1,0,0,0,0,1,0,0,0,0,0},
        {0,0,0,0,0,0,0,1,1,1,0,0,0},
        {0,1,1,0,1,0,0,0,0,0,0,0,0},
        {0,1,0,0,1,1,0,0,1,0,1,0,0},
        {0,1,0,0,1,1,0,0,1,1,1,0,0},
        {0,0,0,0,0,0,0,0,0,0,1,0,0},
        {0,0,0,0,0,0,0,1,1,1,0,0,0},
        {0,0,0,0,0,0,0,1,1,0,0,0,0},
    };
    // vector<int> nums = {2,3,5,7};
    // int n = 88;
    int res = (new Solution())->maxAreaOfIsland(grid);

    // cout << nums << endl;
    // copy(chars.begin(), chars.end(), ostream_iterator<int>(cout, " "));
    return 0;
}