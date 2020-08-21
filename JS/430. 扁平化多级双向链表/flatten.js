/**
 * // Definition for a Node.
 * function Node(val,prev,next,child) {
 *    this.val = val;
 *    this.prev = prev;
 *    this.next = next;
 *    this.child = child;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */

 /* 原地算法，空间占用击败100% */
var flatten = function(head) {
    if (!head) return head;

    let p = head;
    let p_from = null;
    let p_to = null;
    while (p.next || p.child) {
        if (p.child) {
            // 存在子链
            if (p.next) {
                // 迁移后半主链到子链尾
                p_from = p.next;
                p_to = p.child;
                while (p_to.next) {
                    p_to = p_to.next;
                }
                p_to.next = p_from;
                p_to.next.prev = p_to;
            }

            // 子链接到主链上
            p.next = p.child;
            p.next.prev = p;
            p.child = null;
        }
        
        p = p.next;
    }

    return head;
};