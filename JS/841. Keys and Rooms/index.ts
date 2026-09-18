function canVisitAllRooms(rooms: number[][]): boolean {
    const n = rooms.length;
    const roomsLeftSet = new Set<number>(new Array(n).fill(0).map((_, i) => i));

    const dfs = (index: number) => {
        if (!roomsLeftSet.has(index)) {
            return;
        }
        roomsLeftSet.delete(index);
        rooms[index].forEach(key => {
            dfs(key);
        });
    };

    dfs(0);

    return roomsLeftSet.size === 0;
};
