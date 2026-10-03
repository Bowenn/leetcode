class TimeMap {
    valueMap: Map<string, Array<[string, number]>>;
    constructor() {
        this.valueMap = new Map();
    }

    set(key: string, value: string, timestamp: number): void {
        if (this.valueMap.has(key)) {
            this.valueMap.get(key)!.push([value, timestamp]);
        }
        else {
            this.valueMap.set(key, [[value, timestamp]]);
        }
    }

    get(key: string, timestamp: number): string {
        const targetArray = this.valueMap.get(key);
        if (!targetArray) {
            return '';
        }

        // search the largest timestamp <= timestamp
        // iterate through array O(n) O(1)
        // binary search O(logn) O(1)
        if (targetArray[0][1] > timestamp) {
            return '';
        }

        const targetValueIndex = this.binarySearch(timestamp, targetArray);
        return targetArray[targetValueIndex][0];
    }

    binarySearch(timestamp: number, targetArray: Array<[string, number]>) {
        let l = 0;
        let r = targetArray.length - 1;

        while (l <= r) {
            const mid = Math.floor((l + r) / 2);
            if (targetArray[mid][1] === timestamp) {
                return mid;
            }
            else if (targetArray[mid][1] > timestamp) {
                r = mid - 1;
            }
            else {
                l = mid + 1;
            }
        }

        // [1, 2, 3, 4, 6, 7, 8, 9] 5
        //.           l  r, 
        // return targetArray[r][1] > timestamp ? r - 1 : r;
        return r;
    }
}

/**
 * Your TimeMap object will be instantiated and called as such:
 * var obj = new TimeMap()
 * obj.set(key,value,timestamp)
 * var param_2 = obj.get(key,timestamp)
 */
