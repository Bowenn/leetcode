/* eslint-disable no-console */
/* eslint-disable quotes */
export {};

/**
 * Van Emde Boas Tree - Claude
 * -------------------
 * Classic CLRS-style implementation supporting:
 *   - insert(x)      O(log log u)
 *   - delete(x)       O(log log u)
 *   - member(x)       O(log log u)
 *   - successor(x)    O(log log u)
 *   - predecessor(x)  O(log log u)
 *   - minimum()       O(1)
 *   - maximum()       O(1)
 *
 * REQUIREMENTS:
 *   - Universe size `u` must be a power of 2, and u >= 2.
 *   - Elements are integers in the range [0, u - 1].
 *
 * SPACE: O(u), independent of the number of elements stored.
 *   The full recursive structure (summary + clusters) is allocated
 *   eagerly at construction time. This is the fundamental tradeoff
 *   of vEB trees: extremely fast operations, but the universe size
 *   itself (not the element count) drives memory usage. For very
 *   large universes (e.g. 2^32), this is impractical — consider a
 *   lazy/hashed variant if memory is a concern.
 *
 * HOW IT WORKS:
 *   A universe of size u is split into sqrt(u) "clusters", each of
 *   size sqrt(u). Every element x is decomposed into:
 *     high(x) = which cluster x falls into
 *     low(x)  = x's position within that cluster
 *   A recursive "summary" vEB tree (of size sqrt(u)) tracks which
 *   clusters are non-empty, so successor/predecessor/delete never
 *   need to linearly scan sibling clusters — they consult the
 *   summary to jump directly to the next non-empty one.
 */
class VEBTree {
    readonly u: number;
    private min: number | null = null;
    private max: number | null = null;
    private summary: VEBTree | null = null;
    private clusters: VEBTree[] | null = null;
    private readonly lowerSqrt: number;

    constructor(u: number) {
        if (!Number.isInteger(u) || u < 2 || (u & (u - 1)) !== 0) {
            throw new Error("Universe size u must be an integer power of 2, and >= 2");
        }
        this.u = u;

        if (u > 2) {
            const upperSqrt = VEBTree.upperSqrtSize(u);
            const lowerSqrt = u / upperSqrt;
            this.lowerSqrt = lowerSqrt;
            this.summary = new VEBTree(upperSqrt);
            this.clusters = new Array(upperSqrt);
            for (let i = 0; i < upperSqrt; i++) {
                this.clusters[i] = new VEBTree(lowerSqrt);
            }
        } else {
            // base case: u === 2, universe is just {0, 1}
            this.lowerSqrt = 1; // unused at base case
        }
    }

    // 2^ceil(lg(u)/2) — always divides u evenly when u is a power of 2,
    // since upperSqrt * lowerSqrt = 2^ceil(lg/2) * 2^floor(lg/2) = 2^lg(u) = u
    private static upperSqrtSize(u: number): number {
        const lg = Math.log2(u);
        return Math.pow(2, Math.ceil(lg / 2));
    }

    private high(x: number): number {
        return Math.floor(x / this.lowerSqrt);
    }

    private low(x: number): number {
        return x % this.lowerSqrt;
    }

    private index(high: number, low: number): number {
        return high * this.lowerSqrt + low;
    }

    minimum(): number | null {
        return this.min;
    }

    maximum(): number | null {
        return this.max;
    }

    member(x: number): boolean {
        if (x === this.min || x === this.max) return true;
        if (this.u === 2) return false;
        return this.clusters![this.high(x)].member(this.low(x));
    }

    // Insert into a node known to currently be empty (min === null).
    // Kept private: only ever called on a child cluster right after
    // confirming (via its own minimum()) that it's empty.
    private emptyInsert(x: number) {
        this.min = x;
        this.max = x;
    }

    insert(x: number) {
        if (!Number.isInteger(x) || x < 0 || x >= this.u) {
            throw new Error(`x must be an integer in range [0, ${this.u - 1}]`);
        }

        if (this.min === null) {
            this.emptyInsert(x);
            return;
        }

        if (x < this.min) {
            const tmp = x;
            x = this.min;
            this.min = tmp;
        }

        if (this.u > 2) {
            const h = this.high(x);
            const l = this.low(x);
            if (this.clusters![h].minimum() === null) {
                this.summary!.insert(h);
                this.clusters![h].emptyInsert(l);
            } else {
                this.clusters![h].insert(l);
            }
        }

        if (x > this.max!) {
            this.max = x;
        }
    }

    delete(x: number) {
        if (this.min === this.max) {
            // only one element in this subtree (or none); either way,
            // deleting the min (which equals max) empties it
            this.min = null;
            this.max = null;
            return;
        }

        if (this.u === 2) {
            this.min = x === 0 ? 1 : 0;
            this.max = this.min;
            return;
        }

        if (x === this.min) {
            // find the new min: the smallest element in the first
            // non-empty cluster, then physically delete it below
            const firstCluster = this.summary!.minimum()!;
            x = this.index(firstCluster, this.clusters![firstCluster].minimum()!);
            this.min = x;
        }

        const h = this.high(x);
        const l = this.low(x);
        this.clusters![h].delete(l);

        if (this.clusters![h].minimum() === null) {
            this.summary!.delete(h);
            if (x === this.max) {
                const summaryMax = this.summary!.maximum();
                if (summaryMax === null) {
                    this.max = this.min;
                } else {
                    this.max = this.index(summaryMax, this.clusters![summaryMax].maximum()!);
                }
            }
        } else if (x === this.max) {
            this.max = this.index(h, this.clusters![h].maximum()!);
        }
    }

    successor(x: number): number | null {
        if (this.u === 2) {
            if (x === 0 && this.max === 1) return 1;
            return null;
        }

        if (this.min !== null && x < this.min) {
            return this.min;
        }

        const h = this.high(x);
        const l = this.low(x);
        const maxLow = this.clusters![h].maximum();

        if (maxLow !== null && l < maxLow) {
            const offset = this.clusters![h].successor(l)!;
            return this.index(h, offset);
        }

        const succCluster = this.summary!.successor(h);
        if (succCluster === null) return null;

        const offset = this.clusters![succCluster].minimum()!;
        return this.index(succCluster, offset);
    }

    predecessor(x: number): number | null {
        if (this.u === 2) {
            if (x === 1 && this.min === 0) return 0;
            return null;
        }

        if (this.max !== null && x > this.max) {
            return this.max;
        }

        const h = this.high(x);
        const l = this.low(x);
        const minLow = this.clusters![h].minimum();

        if (minLow !== null && l > minLow) {
            const offset = this.clusters![h].predecessor(l)!;
            return this.index(h, offset);
        }

        const predCluster = this.summary!.predecessor(h);
        if (predCluster === null) {
            if (this.min !== null && x > this.min) {
                return this.min;
            }
            return null;
        }

        const offset = this.clusters![predCluster].maximum()!;
        return this.index(predCluster, offset);
    }
}

// ---------------------------------------------------------------------
// Example usage / smoke test (safe to delete)
// ---------------------------------------------------------------------
function demo() {
    const u = 16; // universe [0, 15]
    const veb = new VEBTree(u);
    const values = [2, 3, 4, 5, 7, 14, 15];
    values.forEach(v => veb.insert(v));

    console.log("minimum:", veb.minimum()); // 2
    console.log("maximum:", veb.maximum()); // 15
    console.log("member(5):", veb.member(5)); // true
    console.log("member(6):", veb.member(6)); // false
    console.log("successor(4):", veb.successor(4)); // 5
    console.log("successor(5):", veb.successor(5)); // 7
    console.log("predecessor(7):", veb.predecessor(7)); // 5
    console.log("predecessor(14):", veb.predecessor(14)); // 7

    veb.delete(5);
    console.log("after delete(5), successor(4):", veb.successor(4)); // 7
    console.log("member(5):", veb.member(5)); // false
}

// demo();

export { VEBTree };
