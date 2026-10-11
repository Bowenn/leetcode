/**
 * Definition for _Node.
 * class _Node {
 *     val: number
 *     left: _Node | null
 *     right: _Node | null
 *     next: _Node | null
 * 
 *     constructor(val?: number, left?: _Node, right?: _Node, next?: _Node) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

export {};

class _Node {
    val: number;
    left: _Node | null;
    right: _Node | null;
    next: _Node | null;

    constructor(val?: number, left?: _Node, right?: _Node, next?: _Node) {
        this.val = val === undefined ? 0 : val;
        this.left = left === undefined ? null : left;
        this.right = right === undefined ? null : right;
        this.next = next === undefined ? null : next;
    }
}

function connect(root: _Node | null): _Node | null {

    const visitNode = (node: _Node | null): _Node | null => {
        if (!node) {
            return null;
        }
        let curNode = new _Node();
        const headNode = curNode;
        if (node.left) {
            curNode.next = node.left;
            curNode = node.left;
        }
        if (node.right) {
            curNode.next = node.right;
            curNode = node.right;
        }
        let rightNode = node.next;
        while (rightNode) {
            if (rightNode.left) {
                curNode.next = rightNode.left;
                curNode = rightNode.left;
            }
            if (rightNode.right) {
                curNode.next = rightNode.right;
                curNode = rightNode.right;
            }
            rightNode = rightNode.next;
        }
        return headNode.next;
    };

    let tempNode = root;
    while (tempNode) {
        tempNode = visitNode(tempNode);
    }

    return root;
};
