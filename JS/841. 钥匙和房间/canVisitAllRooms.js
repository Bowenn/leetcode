/**
 * @param {number[][]} rooms
 * @return {boolean}
 */
var canVisitAllRooms = function(rooms) {
    let s = new Set();
    s.add(0);
    let stack = [0];
    while (stack.length > 0) {
        let i = stack.pop();
        for (let j of rooms[i]) {
            if (!s.has(j)) {
                s.add(j);
                stack.push(j);
            }
        }
    }
    return s.size === rooms.length;
};