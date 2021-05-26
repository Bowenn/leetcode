/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const reverseList = function (head) {
    if (!head) return null;
    const t = [];
    while (head.next != null) {
        t.push(head);
        head = head.next;
    }
    let p = head;
    while (t.length > 0) {
        p.next = t.pop();
        p = p.next;
    }
    p.next = null;
    return head;
};
