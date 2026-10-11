
export {};

class Node {
    key: number;
    value: number;
    prev: Node | null = null;
    next: Node | null = null;

    constructor(key: number, value: number) {
        this.key = key;
        this.value = value;
    }
}

class LRUCache {
    knMap: Map<number, Node>;
    capacity: number;
    head: Node | null = null;
    tail: Node | null = null;
    size: number = 0;

    constructor(capacity: number) {
        this.knMap = new Map();
        this.capacity = capacity;
    }

    getNode(key: number): Node | null {
        const targetNode = this.knMap.get(key);
        if (!targetNode) {
            return null;
        }
        if (this.head === targetNode) {
            return targetNode;
        }

        if (targetNode.prev) {
            targetNode.prev.next = targetNode.next;
        }
        if (targetNode.next) {
            targetNode.next.prev = targetNode.prev;
        }
        if (this.tail === targetNode) {
            this.tail = targetNode.prev;
        }

        targetNode.prev = null;
        targetNode.next = this.head;
        this.head!.prev = targetNode;
        this.head = targetNode;

        return targetNode;
    }

    get(key: number): number {
        const targetNode = this.getNode(key);
        return targetNode ? targetNode.value : -1;
    }

    put(key: number, value: number): void {
        const targetNode = this.getNode(key);
        if (targetNode) {
            targetNode.value = value;
        }
        else {
            if (this.capacity <= 0) {
                return;
            }

            const newNode = new Node(key, value);
            this.knMap.set(key, newNode);

            if (this.head) {
                newNode.next = this.head;
                this.head.prev = newNode;
            }
            this.head = newNode;

            if (!this.tail) {
                this.tail = newNode;
            }

            if (this.size < this.capacity) {
                this.size++;
            }
            else {
                const toDrop = this.tail;
                this.knMap.delete(toDrop.key);
                this.tail = toDrop.prev;
                this.tail!.next = null;
            }
        }
    }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
