/**
 * @param {number[][]} rooms
 * @return {boolean}
 */
const canVisitAllRooms = function (rooms) {
    const s = new Set();
    s.add(0);
    const stack = [0];
    while (stack.length > 0) {
        const i = stack.pop();
        for (const j of rooms[i]) {
            if (!s.has(j)) {
                s.add(j);
                stack.push(j);
            }
        }
    }
    return s.size === rooms.length;
};
