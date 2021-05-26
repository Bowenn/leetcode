/**
 * @param {number[]} height
 * @return {number}
 */
const trap = function (height) {
    function myFun () {
        let sum = 0;
        let temp = [height[0], 0];
        let h = 0;

        // Find the TOP(s)
        for (let i = 1; i < height.length; i++) {
            if (height[i] > temp[0]) temp = [height[i], i];
            else if (height[i] === temp[0]) temp.push(i);
        }
        h = temp[0];

        temp[0] = 0;
        temp.push(height.length - 1);

        // start, end, direction
        function containWater (a, b, dirc) {
            let t;
            if (dirc === 1) {
                t = height[a];
                for (let i = a; i < b; i++) {
                    if (height[i] <= t) sum += t - height[i];
                    else t = height[i];
                }
            } else {
                t = height[b];
                for (let i = b; i > a; i--) {
                    if (height[i] <= t) sum += t - height[i];
                    else t = height[i];
                }
            }
        }

        for (let i = 0; i < temp.length - 1; i++) {
            if (i === temp.length - 2) containWater(temp[i], temp[i + 1], -1);
            else containWater(temp[i], temp[i + 1], 1);
        }

        return sum;
    }
    return myFun();
};

// Others'
/**
 * @param {number[]} height
 * @return {number}
 */
const trap0 = function (height) {
    let water = 0;
    let lm = 0;
    let rm = 0;
    for (let l = 0, r = height.length - 1; l < r;) {
        lm = Math.max(lm, height[l]);
        rm = Math.max(rm, height[r]);
        if (lm < rm) {
            water += lm - height[l++];
        } else {
            water += rm - height[r--];
        }
    }
    return water;
};
