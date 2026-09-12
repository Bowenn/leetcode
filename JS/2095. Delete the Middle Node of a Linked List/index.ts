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

function deleteMiddle(head: ListNode | null): ListNode | null {
    let beforeToDelP = null;
    let toDelP = head;
    let tailP = head;

    while (tailP) {
        tailP = tailP.next;
        if (!tailP) {
            break;
        }
        tailP = tailP.next;
        beforeToDelP = toDelP;
        toDelP = toDelP!.next;
    }

    if (!beforeToDelP) {
        return null;
    }

    beforeToDelP.next = toDelP!.next;
    return head;
};
