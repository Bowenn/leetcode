class MinStack:
    stack_list: list[int]
    min_list: list[int]

    def __init__(self):
        self.stack_list = []
        self.min_list = []

    def push(self, value: int) -> None:
        self.stack_list.append(value)
        if len(self.min_list) == 0 or self.min_list[-1] >= value:
            self.min_list.append(value)

    def pop(self) -> None:
        if self.min_list[-1] == self.stack_list[-1]:
            self.min_list.pop()
        self.stack_list.pop()
        

    def top(self) -> int:
        return self.stack_list[-1]

    def getMin(self) -> int:
        return self.min_list[-1]
        


# Your MinStack object will be instantiated and called as such:
# obj = MinStack()
# obj.push(value)
# obj.pop()
# param_3 = obj.top()
# param_4 = obj.getMin()