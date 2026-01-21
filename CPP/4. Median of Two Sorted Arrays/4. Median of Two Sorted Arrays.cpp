#include <iostream>
#include <vector>

using namespace std;

class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        int index1 = 0, index2 = 0;
        int size1 = nums1.size(), size2 = nums2.size();
        int totalSize = size1 + size2;
        while ((index1 + index2) * 2 + 1 < totalSize) {
            if (index1 == size1) {
                index2++;
            }
            else if (index2 == size2 || nums1[index1] < nums2[index2]) {
                index1++;
            }
            else {
                index2++;
            }
        }
        if ((index1 + index2) * 2 + 1 == totalSize) {
            if (index1 == size1) {
                return nums2[index2];
            }
            else if (index2 == size2) {
                return nums1[index1];
            }
            else if (nums1[index1] > nums2[index2]) {
                return nums2[index2];
            }
            else {
                return nums1[index1];
            }
        }
        else {
            int numA, numB;
            // choose the Larger Number of average
            if (index1 == size1) {
                numB = nums2[index2];
            }
            else if (index2 == size2) {
                numB = nums1[index1];
            }
            else if (nums1[index1] > nums2[index2]) {
                numB = nums2[index2];
            }
            else {
                numB = nums1[index1];
            }
            // choose the Smaller Number of average
            if (index1 == 0) {
                numA = nums2[index2 - 1];
            }
            else if (index2 == 0) {
                numA = nums1[index1 - 1];
            }
            else if (nums2[index2 - 1] > nums1[index1 - 1]) {
                numA = nums2[index2 - 1];
            }
            else {
                numA = nums1[index1 - 1];
            }
            return (double(numA) + double(numB)) / 2;
        }
    }
};


int main(){
    // vector<int> nums1 = {63, 95, 97, 111, 113, 131};
    // vector<int> nums2 = {1, 2, 3, 14, 32};

    // vector<int> nums1 = {63, 95, 97, 111, 113, 131};
    // vector<int> nums2 = {1, 2, 3, 14};

    // vector<int> nums1 = {63, 95, 97, 113, 131};
    // vector<int> nums2 = {1, 2, 3, 14, 111};

    vector<int> nums1 = {1,2,3,4,5};
    vector<int> nums2 = {6,7,8,9,10,11,12,13,14,15,16,17};

    int res = (new Solution())->findMedianSortedArrays(nums1, nums2);

    cout << res << endl;
    return 0;
}
