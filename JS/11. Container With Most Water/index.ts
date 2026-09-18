function maxArea(height: number[]): number {
    let maxArea = 0;
    let left = 0;
    let right = height.length - 1;
    let curHeight = 0;

    while (true) {
        if (height[left] > height[right]) {
            maxArea = Math.max(maxArea, height[right] * (right - left));
            curHeight = height[right];
            while (height[right] <= curHeight) {
                right--;
                if (left >= right) {
                    return maxArea;
                }
            }
        }
        else {
            maxArea = Math.max(maxArea, height[left] * (right - left));
            curHeight = height[left];
            while (height[left] <= curHeight) {
                left++;
                if (left >= right) {
                    return maxArea;
                }
            }
        }
    }
};
