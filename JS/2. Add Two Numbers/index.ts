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
    val: number;
    next: ListNode | null;

    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    const newHead = new ListNode();
    let curTail = newHead;
    let temp = 0;
    while (l1 || l2 || temp) {
        let sum = (l1?.val || 0) + (l2?.val || 0) + temp;
        if (sum >= 10) {
            temp = 1;
            sum -= 10;
        }
        else {
            temp = 0;
        }
        const newNode = new ListNode(sum);
        curTail.next = newNode;
        curTail = newNode;

        l1 = l1?.next || null;
        l2 = l2?.next || null;
    }

    return newHead.next;
};
