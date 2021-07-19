/**
 * @param {number[]} height
 * @return {number}
 */

/* 左右互搏（x） */
const maxArea = function(height) {
    let p = 0; q = height.length - 1;
    let hL = height[p], hR = height[q];
    let max = (q - p) * Math.min(hL, hR);
    while(p < q) {
        if (hL <= hR) {
            while(p < q && height[p] <= hL) {
                p++;
            }
            hL = height[p];
        }
        else {
            while(p < q && height[q] <= hR) {
                q--;
            }
            hR = height[q];
        }
        max = Math.max(
            max,
            (q - p) * Math.min(hL, hR)
        );
    }
    return max;
};

/* 我是脑子瓦特了才写出这种算法。。。遍历对比 418ms */
const maxArea1 = function(height) {
    const heightStart = [[0, height[0]]]; // 可以作为左边
    const heightEnd = [[height.length - 1, height[height.length - 1]]]; // 可以作为右边
    for (let i = 1; i < height.length - 1; i++) {
        if (height[i] > heightStart[0][1]) {
            heightStart.unshift([i, height[i]])
        }
    }
    for (let i = height.length - 2; i > 0; i--) {
        if (height[i] > heightEnd[0][1]) {
            heightEnd.unshift([i, height[i]])
        }
    }
    
    let max = 0;
    for (let i = 0; i < heightStart.length; i++) {
        for (let j = 0; j < heightEnd.length; j++) {
            if (heightStart[i][0] < heightEnd[j][0]) {
                max = Math.max(
                    max,
                    Math.min(heightStart[i][1], heightEnd[j][1]) * (heightEnd[j][0] - heightStart[i][0])
                )
            }
        }
    }

    return max;
};