/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */

 struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
};

class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        int offset = 0;
        bool add1Flag = false;
        ListNode *p1 = l1, *p2 = l2;
        int addRes = p1->val + p2->val;
        if (addRes >= 10) {
            add1Flag = true;
        }
        ListNode *res = new ListNode(addRes % 10);
        ListNode *temp = res;

        while(add1Flag || p1->next || p2->next) {
            addRes = (int)add1Flag;
            if (p1->next != nullptr) {
                p1 = p1->next;
                addRes += p1->val;
            }
            if (p2->next != nullptr) {
                p2 = p2->next;
                addRes += p2->val;
            }
            if (addRes >= 10) {
                add1Flag = true;
            }
            else {
                add1Flag = false;
            }
            temp->next = new ListNode(addRes % 10);
            temp = temp->next;
        }
        
        return res;
    }
};