export {};

// self build vEB tree
/**
 * VEBTree — a sqrt-decomposition (vEB-style) tree.
 * U = size of the full universe (end - start + 1), NOT the number of
 * elements inserted. Space is proportional to U regardless of how many
 * elements are actually stored.
 *
 * | Method                          | Time                | Space (extra) |
 * |----------------------------------|----------------------|---------------|
 * | constructor / initChildren       | O(U)                 | O(U)          |
 * | has                              | O(log log U)         | O(log log U) |
 * | add                              | O(log log U)         | O(log log U) |
 * | remove                           | O(√U) worst case     | O(log log U) |
 * | findPredecessor / findSuccessor  | O(√U) worst case     | O(log log U) |
 *
 * NOTE: remove/findPredecessor/findSuccessor degrade to O(√U) because they
 * linearly scan sibling nodes (via the `for (i = targetIndex; ...)` loops)
 * to find a non-empty one. A true vEB tree avoids this with a recursive
 * "summary" structure that jumps directly to the next occupied sibling,
 * keeping all operations at O(log log U). Could be added here using the
 * existing `parent`/`childIndex` fields.
 */

class TreeNode {
    v: boolean = false;
    // range: [start, end]
    start: number;
    end: number;
    // minValue & maxValue in range [start, end]
    min: number = Infinity;
    max: number = -Infinity;

    step: number = 1;
    children?: TreeNode[];
    parent?: TreeNode;
    childIndex?: number;

    constructor(rangeStart: number, rangeEnd: number, parent?: TreeNode, childIndex?: number) {
        this.start = rangeStart;
        this.end = rangeEnd;
        this.parent = parent;
        this.childIndex = childIndex;

        this.initChildren();
    }

    initChildren() {
        if (this.start === this.end) {
            return;
        }
        this.children = [];
        this.step = Math.floor(Math.sqrt(this.end - this.start + 1));
        let offset = this.start;
        while (offset <= this.end) {
            this.children.push(new TreeNode(
                offset,
                Math.min(offset + this.step - 1, this.end),
                this,
                this.children.length
            ));
            offset += this.step;
        }
    }

    // search a num, top-down
    has(num: number): boolean {
        if (!this.v || this.min > num || this.max < num) {
            return false;
        }

        if (this.min === num || this.max === num) {
            return true;
        }

        if (this.children) {
            const targetIndex = Math.floor((num - this.start) / this.step);
            if (this.children[targetIndex]) {
                return this.children[targetIndex].has(num);
            }
        }

        return false;
    }

    // add a num, top-down
    add(num: number) {
        if (num < this.start || num > this.end) {
            return;
        }
        this.v = true;
        this.min = Math.min(this.min, num);
        this.max = Math.max(this.max, num);

        if (this.children) {
            const targetIndex = Math.floor((num - this.start) / this.step);
            if (this.children[targetIndex]) {
                this.children[targetIndex].add(num);
            }
        }
    }

    // remove a num, search by top-down, then update by bottom-up
    remove(num: number) {
        if (!this.v || this.min > num || this.max < num) {
            return;
        }

        if (this.start === num && this.end === num) { // cur Node is the target
            this.v = false;
            this.min = Infinity;
            this.max = -Infinity;
        }
        else if (this.children) {
            const targetIndex = Math.floor((num - this.start) / this.step);
            if (this.children[targetIndex]) {
                this.children[targetIndex].remove(num);

                // update min & max of current Node
                if (this.min === num && this.max === num) {
                    this.v = false;
                    this.min = Infinity;
                    this.max = -Infinity;
                }
                else if (this.min === num) {
                    this.min = Infinity;
                    for (let i = targetIndex; i < this.children.length; i++) {
                        if (Number.isFinite(this.children[i].min)) {
                            this.min = this.children[i].min;
                            break;
                        }
                    }
                }
                else if (this.max === num) {
                    this.max = -Infinity;
                    for (let i = targetIndex; i >= 0; i--) {
                        if (Number.isFinite(this.children[i].max)) {
                            this.max = this.children[i].max;
                            break;
                        }
                    }
                }
            }
        }
    }

    findPredecessor(num: number): number {
        if (!this.v) {
            return -Infinity;
        }
        if (this.end < num) {
            return this.max;
        }
        if (this.children) {
            const targetIndex = Math.floor((num - this.start) / this.step);
            for (let i = targetIndex; i >= 0; i--) {
                const result = this.children[i].findPredecessor(num);
                if (Number.isFinite(result)) {
                    return result;
                }
            }
            return -Infinity;
        }
        return -Infinity;
    }
    findSuccessor(num: number): number {
        if (!this.v) {
            return Infinity;
        }
        if (this.start > num) {
            return this.min;
        }
        if (this.children) {
            const targetIndex = Math.floor((num - this.start) / this.step);
            for (let i = targetIndex; i < this.children.length; i++) {
                const result = this.children[i].findSuccessor(num);
                if (Number.isFinite(result)) {
                    return result;
                }
            }
            return Infinity;
        }
        return Infinity;
    }
}

class VEBTree {
    root: TreeNode;

    constructor(rangeStart: number, rangeEnd: number, arr?: number[]) {
        this.root = new TreeNode(rangeStart, rangeEnd);

        arr && arr.forEach(num => {
            this.root.add(num);
        });
    }

    has(num: number): boolean {
        return this.root.has(num);
    }

    add(num: number) {
        this.root.add(num);
    }

    remove(num: number) {
        this.root.remove(num);
    }

    findPredecessor(num: number): number | null {
        const res = this.root.findPredecessor(num);
        if (Number.isFinite(res)) {
            return res;
        }
        return null;
    }

    findSuccessor(num: number): number | null {
        const res = this.root.findSuccessor(num);
        if (Number.isFinite(res)) {
            return res;
        }
        return null;
    }
}
