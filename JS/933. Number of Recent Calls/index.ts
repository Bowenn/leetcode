class RecentCounter {
    requestedQueue: number[] = [];

    // eslint-disable-next-line no-useless-constructor
    constructor() {
    }

    ping(t: number): number {
        this.requestedQueue.push(t);
        while (this.requestedQueue[0] < t - 3000) {
            this.requestedQueue.shift();
        }
        return this.requestedQueue.length;
    }
}

/**
 * Your RecentCounter object will be instantiated and called as such:
 * var obj = new RecentCounter()
 * var param_1 = obj.ping(t)
 */
