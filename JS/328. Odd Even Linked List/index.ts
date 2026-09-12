/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

export {};

class ListNode {
    val: number
    next: ListNode | null

    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}

function oddEvenList(head: ListNode | null): ListNode | null {
    if (!head || !head.next) {
        return head;
    }
    const oddHead = head;
    const evenHead = head.next;

    let oddTail = oddHead;
    let evenTail = evenHead;

    let curNode = head.next.next;
    while (curNode) {
        oddTail.next = curNode;
        oddTail = curNode;
        curNode = curNode.next;
        if (curNode) {
            evenTail.next = curNode;
            evenTail = curNode;
            curNode = curNode.next;
        }
    }

    oddTail.next = evenHead;
    evenTail.next = null;

    return oddHead;
};
