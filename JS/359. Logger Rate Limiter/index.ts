class Logger {
    msgMap: Map<string, number>; // <msg, last shown timestamp>
    constructor() {
        this.msgMap = new Map();
    }

    shouldPrintMessage(timestamp: number, message: string): boolean {
        const lastShownTime = this.msgMap.get(message);
        if (lastShownTime === undefined || lastShownTime + 10 <= timestamp) {
            this.msgMap.set(message, timestamp);
            return true;
        }
        return false;
    }
}

/**
 * Your Logger object will be instantiated and called as such:
 * var obj = new Logger()
 * var param_1 = obj.shouldPrintMessage(timestamp,message)
 */
