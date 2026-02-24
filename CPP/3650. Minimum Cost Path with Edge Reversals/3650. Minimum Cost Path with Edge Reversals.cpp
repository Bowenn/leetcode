#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <queue>
#include <iostream>

using namespace std;

class Solution {
private:
    // dfs Time Limit Exceeded
    //
    // int minD = INT_MAX;
    // void dfs(int curNode, int curDistance, int target,
    //     vector<unordered_map<int, int>>& distanceMap,
    //     unordered_set<int>& visited
    // ) {
    //     // if find target
    //     if (curNode == target) {
    //         minD = min(minD, curDistance);
    //         return;
    //     }
    //     // current distance is already larger than other path
    //     if (curDistance >= minD) {
    //         return;
    //     }

    //     unordered_map<int, int> availableEdges = distanceMap[curNode];
    //     for (auto edge: availableEdges) {
    //         if (visited.count(edge.first)) {
    //             continue;
    //         }
    //         visited.insert(edge.first);
    //         dfs(edge.first, curDistance + edge.second, target, distanceMap, visited);
    //         visited.erase(edge.first);
    //     }

    //     return;
    // }
public:
    int minCost(int n, vector<vector<int>>& edges) {
        // build graph
        vector<unordered_map<int, int>> distanceMap(n);
        for (vector<int> edge: edges) {
            int u = edge[0];
            int v = edge[1];
            // update distance of U -> V and V -> U
            if (distanceMap[u][v] == 0) {
                distanceMap[u][v] = edge[2];
            }
            else {
                distanceMap[u][v] = min(distanceMap[u][v], edge[2]);
            }
            if (distanceMap[v][u] == 0) {
                distanceMap[v][u] = edge[2] * 2;
            }
            else {
                distanceMap[v][u] = min(distanceMap[v][u], edge[2] * 2);
            }
        }

        // dfs to search path and calc the distance
        // unordered_set<int> visited;
        // dfs(0, 0, n - 1, distanceMap, visited);

        // if (minD == INT_MAX) {
        //     return -1;
        // }
        // return minD;

        vector<int> distanceToNode(n);
        distanceToNode[0] = 0;
        distanceToNode[n - 1] = INT_MAX;
        queue<int> toVisit;
        toVisit.push(0);
        while (!toVisit.empty()) {
            int curNode = toVisit.front();
            toVisit.pop();
            for (auto edge: distanceMap[curNode]) {
                if (distanceToNode[edge.first] == 0 || distanceToNode[curNode] + edge.second < distanceToNode[edge.first]) {
                    distanceToNode[edge.first] = distanceToNode[curNode] + edge.second;
                    toVisit.push(edge.first);
                }
            }
        }

        if (distanceToNode[n - 1] == INT_MAX) {
            return -1;
        }

        return distanceToNode[n - 1];
    }
};

int main(){
    vector<vector<int>> edges = {
        {0,2,1},
        {2,1,1},
        {1,3,1},
        {2,3,3},
    };
    // vector<int> nums = {1, 21, 2};
    // string nums = "2357";
    int n = 4;
    // int n = 2;
    int res = (new Solution())->minCost(n, edges);

    return 0;
}
