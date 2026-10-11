# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
class BSTIterator:
    iterator_stack: list[TreeNode | None]
    iterator_stack_lr: list[int] # 0-left visiting, 1-self visiting, 2-right visiting
    total: int
    visited: int

    def __init__(self, root: TreeNode | None):
        self.iterator_stack = [root]
        self.iterator_stack_lr = []
        self.total = 0
        self.visited = 0
        while self.iterator_stack[-1] is not None:
            self.iterator_stack_lr.append(0)
            self.iterator_stack.append(self.iterator_stack[-1].left)
        self.iterator_stack.pop() # pop None node

        def dfs(node: TreeNode | None):
            if node is None:
                return
            self.total += 1
            dfs(node.left)
            dfs(node.right)
        
        dfs(root)

    def next(self) -> int:
        self.visited += 1

        while self.iterator_stack_lr[-1] == 2:
            self.iterator_stack_lr.pop()
            self.iterator_stack.pop()
        
        if self.iterator_stack_lr[-1] == 0:
            self.iterator_stack_lr[-1] = 1
            return self.iterator_stack[-1].val
        
        if self.iterator_stack_lr[-1] == 1:
            self.iterator_stack_lr[-1] = 2

            cur_node = self.iterator_stack[-1]
            if cur_node.right is not None:
                self.iterator_stack_lr.append(0)
                self.iterator_stack.append(cur_node.right)
                cur_node = cur_node.right

                while cur_node.left is not None:
                    self.iterator_stack_lr.append(0)
                    self.iterator_stack.append(cur_node.left)
                    cur_node = cur_node.left

                self.iterator_stack_lr[-1] = 1
                return self.iterator_stack[-1].val
            else:
                while self.iterator_stack_lr[-1] == 2:
                    self.iterator_stack_lr.pop()
                    self.iterator_stack.pop()
                cur_node = self.iterator_stack[-1]
                if self.iterator_stack_lr[-1] == 0: # it is always True, unless visited > total
                    self.iterator_stack_lr[-1] = 1
                    return self.iterator_stack[-1].val

            return -1

    def hasNext(self) -> bool:
        return self.visited < self.total
        


# Your BSTIterator object will be instantiated and called as such:
# obj = BSTIterator(root)
# param_1 = obj.next()
# param_2 = obj.hasNext()

# 更好的实现
class BSTIteratorBetter:

    def __init__(self, root: TreeNode | None):
        self.stack = []
        # 初始化：一路向左下扎到底，只把左边界压栈，耗时 O(h)，空间 O(h)
        self._push_left(root)

    def _push_left(self, node: TreeNode | None):
        while node:
            self.stack.append(node)
            node = node.left

    def next(self) -> int:
        # 栈顶就是当前最小的节点
        curr = self.stack.pop()
        # 如果当前节点有右子树，将右子树的最左分支一路压栈
        if curr.right:
            self._push_left(curr.right)
        return curr.val

    def hasNext(self) -> bool:
        # 只要栈不为空，就说明还有下一个节点，耗时 O(1)
        return len(self.stack) > 0