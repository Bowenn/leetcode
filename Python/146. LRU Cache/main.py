#. 
#. 


class Node:
    def __init__(self, key=0, value=0):
        self.key = key
        self.value = value
        self.prev = None
        self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        self.cache = {}
        self.capacity = capacity
        self.head = Node()
        self.tail = Node()
        self.head.next = self.tail
        self.tail.prev = self.head

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        node = self.cache[key]
        # move to head
        self._remove(node)
        self._add_head(node)
        return node.value

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            node = self.cache[key]
            node.value = value
            # move to head
            self._remove(node)
            self._add_head(node)
        else:
            new_node = Node(key, value)
            self.cache[key] = new_node
            self._add_head(new_node)
            # remove tail
            if len(self.cache) > self.capacity:
                to_remove = self.tail.prev
                self._remove(to_remove)
                del self.cache[to_remove.key]

    def _remove(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

    def _add_head(self, node):
        node.prev = self.head
        node.next = self.head.next
        self.head.next.prev = node
        self.head.next = node

# Your LRUCache object will be instantiated and called as such:
# obj = LRUCache(capacity)
# param_1 = obj.get(key)
# obj.put(key,value)