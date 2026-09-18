/**
 * Definition for _Node.
 * class _Node {
 *     val: number
 *     neighbors: _Node[]
 *
 *     constructor(val?: number, neighbors?: _Node[]) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.neighbors = (neighbors===undefined ? [] : neighbors)
 *     }
 * }
 *
 */

class _Node {
    val: number;
    neighbors: _Node[];

    constructor(val?: number, neighbors?: _Node[]) {
        this.val = (val === undefined ? 0 : val);
        this.neighbors = (neighbors === undefined ? [] : neighbors);
    }
}

function cloneGraph(node: _Node | null): _Node | null {
    if (!node) {
        return null;
    }
    const nodeMap: Record<number, _Node> = {} as Record<number, _Node>;

    const dfs = (node: _Node) => {
        if (!(node.val in nodeMap)) {
            /**
             * 这一层没visited，才要执行的逻辑
             */
            const cloneNode = new _Node(node.val);
            nodeMap[node.val] = cloneNode;

            node.neighbors.forEach(neighbor => {
                dfs(neighbor);
                /**
                * 即使下一层visited，也要执行的逻辑
                */
                cloneNode.neighbors.push(nodeMap[neighbor.val]);
            });
        }
    };

    dfs(node);

    return nodeMap[1];
};
