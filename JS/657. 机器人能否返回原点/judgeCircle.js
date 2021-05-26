/**
 * @param {string} moves
 * @return {boolean}
 */
const judgeCircle = function (moves) {
    let [x, y] = [0, 0];
    for (let i = 0, l = moves.length; i < l; i++) {
        switch (moves[i]) {
        case 'U': {
            y++;
            break;
        }
        case 'D': {
            y--;
            break;
        }
        case 'R': {
            x++;
            break;
        }
        case 'L': {
            x--;
            break;
        }
        }
    }
    return x === 0 && y === 0;
};
