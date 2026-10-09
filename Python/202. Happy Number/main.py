class Solution:
    def isHappy(self, n: int) -> bool:
        n_set = set()

        while n != 1:
            n_set.add(n)
            next_n = 0
            while n > 0:
                mod10 = n % 10
                next_n += mod10 * mod10
                n //= 10
            
            if next_n in n_set:
                return False
            n = next_n

        return True

# quicker solution
class Solution2:
    def isHappy(self, n: int) -> bool:
        check=set()
        while n>0 and n not in check:
            check.add(n)
            s=0
            for i in str(n):
                s+=int(i)**2
            n=s
        return n==1