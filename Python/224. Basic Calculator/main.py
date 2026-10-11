
from abc import abstractmethod


class CalcNode:
    @abstractmethod
    def calc(self) -> float:
        pass

class SignNode(CalcNode):
    val: str
    left: CalcNode
    right: CalcNode

    def __init__(self, val: str):
        self.val = val

    def calc(self) -> float:
        match self.val:
            case "+":
                return self.left.calc() + self.right.calc()
            case "-":
                return self.left.calc() - self.right.calc()
            case "*":
                return self.left.calc() * self.right.calc()
            case "/":
                return self.left.calc() / self.right.calc()
            case _:
                raise ValueError("Invalid operator")

class NumNode(CalcNode):
    val: float

    def __init__(self, val: float):
        self.val = val

    def calc(self) -> float:
        return self.val

class Solution:
    def calculate(self, s: str) -> int:
        n = len(s)
        i = 0

        cur_node = SignNode("+")
        cur_node.left = NumNode(0)
        cur_node.right = NumNode(0)

        def read_char() -> str | None:
            nonlocal s, n, i
            while i < n and s[i] == " ":
                i += 1
            if i == n:
                return None
            char = s[i]
            i += 1
            return char

        def build_node() -> CalcNode:
            nonlocal n, i, cur_node # keep tracking this through building process
            root_node = cur_node
            while i < n:
                c = read_char()
                if c is None:
                    return root_node

                if c.isdigit(): # number
                    temp_num = 0
                    while c is not None and c.isdigit():
                        temp_num = temp_num * 10 + int(c)
                        c = read_char()
                    cur_node.right = NumNode(temp_num)
                    if c is None:
                        return root_node
                    i -= 1
                elif c == "(":
                    temp_node = cur_node
                    cur_node = SignNode("+")
                    cur_node.left = NumNode(0)
                    cur_node.right = NumNode(0)
                    temp_node.right = build_node()
                    cur_node = temp_node
                elif c == ")":
                    return root_node
                elif c == "*" or c == "/":
                    if cur_node.val == "+" or cur_node.val == "-":
                        temp_node = cur_node
                        cur_node = SignNode(c)
                        cur_node.left = temp_node.right
                        temp_node.right = cur_node
                    else:
                        root_node = SignNode(c)
                        root_node.left = cur_node
                        cur_node = root_node
                else:
                    root_node = SignNode(c)
                    root_node.left = cur_node
                    cur_node = root_node

            # print(root_node.calc())
            return root_node

        root = build_node()
        return int(root.calc())
