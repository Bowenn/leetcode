/**
 * @param {number} n
 * @return {number}
 */
const nthPersonGetsNthSeat = function (n) {
    /**
     * 第1个人有三种可能：
     *  1）坐到1号位置 —— 此时第n个人一定能坐到自己的位置
     *  2）坐到n号位置 —— 此时第n个人一定不能坐到自己的位置
     *  3）坐到其他(k号)位置 —— 此时第k人递归成1号人：
     *      i) 坐到1号位置 —— 此时第n个人一定能坐到自己的位置
     *      ii）坐到n号位置 —— 此时第n个人一定不能坐到自己的位置
     *      iii) 坐到其他位置 —— 继续递归。。。
     *
     * 直到前n-2个人都既没有坐到1号位也没有坐到n号位，n-1有2个座位可以选，n坐到自己座位概率为1/2
     */

    // 递归算法
    // let p_nth = (nth, total) => {
    //     if (total === 1) {
    //         // 只有2个座位
    //         return 1;
    //     }
    //     else {
    //         return 1/total * 1 + 1/total * 0 + (total - 2)/total * p_nth(nth + 1, total - 1);
    //     }
    // }

    /**
     * 实际上，就是『 1/n + (n-2)/n * 1/2 』的嵌套计算循环，这个值固定为1/2
     * 为什么固定是1/2? 数学问题请在草纸上自己算
     */

    return n === 1 ? 1 : 0.5;
};
