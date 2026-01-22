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
    /**
     * @param dirction: 0 - uncertain; -1 vertical; 1 - horizontal
     */
    bool walk(int y, int x, vector<vector<char>>& board, int dirction = 0) {
        if (y < 0 || y >= boardYSize || x < 0 || x >= boardXSize) {
            return false;
        }
        if (board[y][x] == '.') {
            return false;
        }
        board[y][x] = '.';
        if (dirction < 0) {
            walk(y + 1, x, board, -1);
        }
        else if (dirction > 0) {
            walk(y, x + 1, board, 1);
        }
        else {
            if (y + 1 < boardYSize && board[y + 1][x] == 'X') {
                board[y + 1][x] = '.';
                walk(y + 2, x, board, -1);
            }
            else if (x + 1 < boardXSize && board[y][x + 1] == 'X') {
                board[y][x + 1] = '.';
                walk(y, x + 2, board, 1);
            }
        }

        return true;
    }
public:
    int countBattleships(vector<vector<char>>& board) {
        boardYSize = board.size();
        boardXSize= board[0].size();

        int res = 0;

        // then walk the rest (same as q200)
        for (int i = 0; i < boardYSize; i++) {
            for (int j = 0; j < boardXSize; j++) {
                if (walk(i, j, board)) {
                    res++;
                }
            }
        }

        return res;
    }
};

int main(){
    // vector<vector<char>> chars = {
    //     {'X','.','.','X'},
    //     {'.','.','.','X'},
    //     {'.','.','.','X'}
    // };
    vector<vector<char>> chars = {
        {'X','.','.','X'},
        {'X','.','.','X'}
    };
    // vector<int> nums = {2,3,5,7};
    // int n = 88;
    int res = (new Solution())->countBattleships(chars);

    // cout << nums << endl;
    // copy(chars.begin(), chars.end(), ostream_iterator<int>(cout, " "));
    return 0;
}