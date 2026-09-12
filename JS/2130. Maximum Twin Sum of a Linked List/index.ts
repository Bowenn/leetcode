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

function pairSum(head: ListNode | null): number {
    // separate linked list into 2 parts and reverse the back part
    let frontHead = head;
    let backNode = head;

    while (head) {
        backNode = backNode!.next;
        head = head.next;
        head = head!.next;
    }

    let backHead = null;
    while (backNode) {
        const curNode = backNode;
        backNode = backNode.next;
        curNode.next = backHead;
        backHead = curNode;
    }

    let res = 0;
    while (backHead) {
        res = Math.max(res, backHead.val + frontHead!.val);
        backHead = backHead.next;
        frontHead = frontHead!.next;
    }

    return res;
};

// dumby solution, store all values in an array and calculate the max twin sum
function pairSum1(head: ListNode | null): number {
    const values: number[] = [];
    while (head) {
        values.push(head.val);
        head = head.next;
    }

    let res = 0;
    for (let i = 0; i < values.length / 2; i++) {
        res = Math.max(res, values[i] + values[values.length - 1 - i]);
    }

    return res;
};
