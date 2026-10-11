class RandomizedSet {
    indexMap: Map<number, number>;
    list: number[];

    constructor() {
        this.indexMap = new Map();
        this.list = [];
    }

    insert(val: number): boolean {
        if (this.indexMap.has(val)) {
            return false;
        }
        this.list.push(val);
        this.indexMap.set(val, this.list.length - 1);
        return true;
    }

    remove(val: number): boolean {
        const targetIndex = this.indexMap.get(val);
        if (targetIndex === undefined) {
            return false;
        }
        this.indexMap.delete(this.list[targetIndex]);
        if (this.list.length > 1 && targetIndex < this.list.length - 1) {
            this.list[targetIndex] = this.list[this.list.length - 1];
            this.indexMap.set(this.list[targetIndex], targetIndex);
        }
        this.list.pop();
        return true;
    }

    getRandom(): number {
        const index = Math.floor(Math.random() * this.list.length);
        return this.list[index];
    }
}

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */
