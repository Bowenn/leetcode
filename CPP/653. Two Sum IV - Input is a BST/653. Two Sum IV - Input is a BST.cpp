#include <iostream>
#include <vector>
#include <set>

using namespace std;

/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */

struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};

class Solution {
private:
    set<int> valueGapSet;
    int target;
    bool searchNode(TreeNode* root) {
        if (root == nullptr || root->val == NULL) {
            return false;
        }
        set<int>::iterator findRes = valueGapSet.find(root->val);
        if (findRes == valueGapSet.end()) {
            valueGapSet.insert(target - root->val);
            return searchNode(root->left) || searchNode(root->right);
        }
        else {
            return true;
        }
    }
public:
    bool findTarget(TreeNode* root, int k) {
        target = k;
        return searchNode(root);
    }
};

// BST can be traned into sorted array easily
class SolutionFaster {
public:
    void inorder(TreeNode* root,vector<int>& ans){
        if(root==NULL) return ;
        inorder(root->left,ans);
        ans.push_back(root->val);
        inorder(root->right,ans);
    }
    bool findTarget(TreeNode* root, int k) {
        vector<int> ans;
        inorder(root,ans);
        for(int i=0;i<ans.size();i++){
            int target=k-ans[i];
            int left=i+1;
            int right=ans.size()-1;
            while(left<=right){
                int mid=left+(right-left)/2;
                if(ans[mid]==target){
                    return true;
                }
                else if(ans[mid]>target){
                    right=mid-1;
                }
                else{
                    left=mid+1;
                }
            }
        }
        return false;
    }
};
