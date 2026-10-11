import math

class Solution:
    def evalRPN(self, tokens: list[str]) -> int:
        number_stack: list[int] = []

        for t in tokens:
            match t:
                case "+":
                    num = number_stack.pop()
                    number_stack[-1] += num
                case "-":
                    num = number_stack.pop()
                    number_stack[-1] -= num
                case "*":
                    num = number_stack.pop()
                    number_stack[-1] *= num
                case "/":
                    num = number_stack.pop()
                    # 2 // -3 == math.floor(2 / -3) == math.floor(-0.66) == -1
                    # so, we would use math.trunc instead
                    number_stack[-1] = math.trunc(number_stack[-1] / num)
                case _:
                    number_stack.append(int(t))
            # print(number_stack)
        return number_stack[0]
