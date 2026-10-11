export {};

function trap(height: number[]): number {
    let l = 0;
    let r = height.length - 1;
    let water = 0;
    while (l < r) {
        if (height[l] < height[r]) {
            const currentHeight = height[l];
            while (l < r && height[l] <= currentHeight) {
                water += currentHeight - height[l];
                l++;
            }
        }
        else {
            const currentHeight = height[r];
            while (l < r && height[r] <= currentHeight) {
                water += currentHeight - height[r];
                r--;
            }
        }

        if (l === r) {
            return water;
        }
    }
    return water;
};
