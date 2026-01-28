#include <vector>
#include <unordered_map>
#include <map>
#include <unordered_set>
#include <queue>
#include <iostream>

using namespace std;
class Solution {
public:
    int minCost(vector<vector<int>>& grid, int k) {
        int m = grid.size();
        int n = grid[0].size();
        vector<pair<int, int>> points(m * n);
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                points[i * n + j] = {i, j};
            }
        }
        sort(points.begin(), points.end(), [&grid](const auto& a, const auto& b) {
            return grid[a.first][a.second] < grid[b.first][b.second];
        });

        // start with no teleportations
        vector<vector<int>>* costGrid = new vector<vector<int>>(m, vector<int>(n));
        (*costGrid)[0][0] = 0;
        for (int i = 0; i < m; i++) {
            if (i != 0) {
                (*costGrid)[i][0] = (*costGrid)[i - 1][0] + grid[i][0];
            }
            for (int j = 1; j < n; j++) {
                if (i == 0) {
                    (*costGrid)[i][j] = (*costGrid)[i][j - 1] + grid[i][j];
                }
                else {
                    (*costGrid)[i][j] = min((*costGrid)[i][j - 1], (*costGrid)[i - 1][j]) + grid[i][j];
                }
            }
        }

        int lastCost = (*costGrid)[m - 1][n - 1];
        vector<vector<int>>* costGridAfterTele = new vector<vector<int>>(m, vector<int>(n));
        // add teleportations 1 by 1, i: teleport times
        for (int i = 1; i <= k; i++) {
            // teleport only from larger to smaller points
            auto& largestPoint = points[m * n - 1];
            int costValueTemp = grid[largestPoint.first][largestPoint.second];
            int minCostTemp = (*costGrid)[largestPoint.first][largestPoint.second];
            int j = m * n - 2;
            int tempJ = m * n - 1;
            while (true) {
                if (j < 0) {
                    for (; tempJ > j; tempJ--) {
                        auto& toSetPoint = points[tempJ];
                        (*costGridAfterTele)[toSetPoint.first][toSetPoint.second] = minCostTemp;
                    }
                    break;
                }
                auto& point = points[j];
                if (grid[point.first][point.second] < costValueTemp) {
                    for (; tempJ > j; tempJ--) {
                        auto& toSetPoint = points[tempJ];
                        (*costGridAfterTele)[toSetPoint.first][toSetPoint.second] = minCostTemp;
                    }
                    costValueTemp = grid[point.first][point.second];
                }
                minCostTemp = min(minCostTemp, (*costGrid)[point.first][point.second]);
                j--;
            }

            for (int i = 0; i < m; i++) {
                if (i != 0) {
                    (*costGridAfterTele)[i][0] = min((*costGridAfterTele)[i][0], (*costGridAfterTele)[i - 1][0] + grid[i][0]);
                }
                for (int j = 1; j < n; j++) {
                    if (i == 0) {
                        (*costGridAfterTele)[i][j] = min((*costGridAfterTele)[i][j], (*costGridAfterTele)[i][j - 1] + grid[i][j]);
                    }
                    else {
                        (*costGridAfterTele)[i][j] = min((*costGridAfterTele)[i][j], min((*costGridAfterTele)[i][j - 1], (*costGridAfterTele)[i - 1][j]) + grid[i][j]);
                    }
                }
            }

            delete costGrid;
            costGrid = costGridAfterTele;
            costGridAfterTele = new vector<vector<int>>(m, vector<int>(n));
        }

        return (*costGrid)[m - 1][n - 1];
    }
};

// class Solution {
// private:
//     int m;
//     int n;
//     map<int, vector<pair<int, int>>> valueMap;
//     int curMinCost = INT_MAX;
//     void searchMinCost(vector<vector<int>>& grid, int k, int curY, int curX, int curCost, int visitedMaxValue, int teleportedMaxValue, unordered_set<int> &visited) {
//         if (curCost >= curMinCost) {
//             return;
//         }
//         if (curY == m - 1 && curX == n - 1) {
//             curMinCost = curCost;
//         }

//         int curValue = grid[curY][curX];
//         // if used to visit a larger number, we already teleported at that time, it has no meaning to teleport now
//         bool curValueIsLarger = curValue > visitedMaxValue;
//         int newVisitedMaxValue = curValueIsLarger ? curValue : visitedMaxValue;
//         // try teleport
//         if (k > 0 && curValueIsLarger) {
//             auto loopStart = valueMap.lower_bound(visitedMaxValue + 1);
//             auto loopEnd = valueMap.upper_bound(curValue);
//             for (auto i = loopStart; i != loopEnd; i++) {
//                 for (auto telePoint: i->second) {
//                     int position = telePoint.first * m + telePoint.second;
//                     if (!visited.count(position)) {
//                         visited.insert(position);
//                         searchMinCost(grid, k - 1, telePoint.first, telePoint.second, curCost, newVisitedMaxValue, max(teleportedMaxValue, i->first), visited);
//                         visited.erase(position);
//                     }
//                 }
//             }
//         }

//         // try go right
//         if (curX + 1 < n) {
//             int nextValue = grid[curY][curX + 1];
//             int position = curY * m + curX + 1;
//             if (!visited.count(position) && nextValue > teleportedMaxValue) {
//                 visited.insert(position);
//                 searchMinCost(grid, k, curY, curX + 1, curCost + nextValue, newVisitedMaxValue, teleportedMaxValue, visited);
//                 visited.erase(position);
//             }
//         }

//         // try go down
//         if (curY + 1 < m) {
//             int nextValue = grid[curY + 1][curX];
//             int position = (curY + 1) * m + curX;
//             if (!visited.count(position) && nextValue > teleportedMaxValue) {
//                 visited.insert(position);
//                 searchMinCost(grid, k, curY + 1, curX, curCost + nextValue, newVisitedMaxValue, teleportedMaxValue, visited);
//                 visited.erase(position);
//             }
//         }
//     }
// public:
//     int minCost(vector<vector<int>>& grid, int k) {
//         // first, organize the data of teleportaions
//         m = grid.size();
//         n = grid[0].size();
//         int temp = 0; // calc a initial cost value to avoid some useless search
//         for (int i = m - 1; i >= 0; i--) { // loop start from destination, so that we can get min value quicker
//             temp += grid[i][0];
//             for (int j = n - 1; j >= 0; j--) {
//                 if (i == m - 1) {
//                     temp += grid[i][j];
//                 }
//                 valueMap[grid[i][j]].push_back({i, j});
//             }
//         }
//         temp -= grid[0][0];
//         temp -= grid[m - 1][0];
//         curMinCost = temp;
//         unordered_set<int> visited;
//         visited.insert(0);

//         searchMinCost(grid, k, 0, 0, 0, -1, 0, visited);

//         return curMinCost;
//     }
// };

int main(){
    // vector<vector<int>> grid = {
    //     {1,3,3},
    //     {2,5,4},
    //     {4,3,5},
    // };
    vector<vector<int>> grid = {
        {1, 1, 2},
        {1, 1, 1},
    };
    // vector<int> nums = {1, 21, 2};
    // string nums = "2357";
    int n = 4;
    // int n = 2;
    int res = (new Solution())->minCost(grid, 3);

    return 0;
}
