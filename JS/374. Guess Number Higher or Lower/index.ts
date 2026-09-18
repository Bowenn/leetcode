/**
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return      -1 if num is higher than the picked number
 *               1 if num is lower than the picked number
 *               otherwise return 0
 * var guess = function(num) {}
 */

function guess(num: number): number {
    // This is a placeholder implementation. In a real scenario, this would be provided by the problem.
    return 0; // Replace with actual implementation
}

function guessNumber(n: number): number {
    let left = 1;
    let right = n;
    let mid = Math.floor((left + right) / 2);

    while (true) {
        const guessRes = guess(mid);
        if (guessRes === 0) {
            return mid;
        }
        else if (guessRes < 0) {
            right = mid - 1;
            mid = Math.floor((left + right) / 2);
        }
        else {
            left = mid + 1;
            mid = Math.floor((left + right) / 2);
        }
    }
};
