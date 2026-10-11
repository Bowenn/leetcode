class MinStack {
    stack: number[];
    minStack: number[];

    constructor() {
        this.stack = [];
        this.minStack = [];
    }

    push(value: number): void {
        this.stack.push(value);
        if (!this.minStack.length || this.minStack[this.minStack.length - 1] >= value) {
            this.minStack.push(value);
        }
    }

    pop(): void {
        if (!this.stack.length) {
            return;
        }
        if (this.minStack[this.minStack.length - 1] === this.stack[this.stack.length - 1]) {
            this.minStack.pop();
        }
        this.stack.pop();
    }

    top(): number {
        if (!this.stack.length) {
            return 0;
        }
        return this.stack[this.stack.length - 1];
    }

    getMin(): number {
        if (!this.stack.length) {
            return -Infinity;
        }
        return this.minStack[this.minStack.length - 1];
    }
}

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(value)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
