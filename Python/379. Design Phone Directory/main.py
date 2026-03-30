class PhoneDirectory(object):

    def __init__(self, maxNumbers):
        """
        :type maxNumbers: int
        """
        self.max_num = maxNumbers
        self.slot_count = 0
        self.current_slot_list = []
        self.empty_slot_list = []
        

    def get(self):
        """
        :rtype: int
        """
        if len(self.empty_slot_list):
            n = self.empty_slot_list.pop()
            self.current_slot_list[n] = False
            return n
        elif self.slot_count < self.max_num:
            self.current_slot_list.append(False)
            self.slot_count += 1
            return self.slot_count - 1
        else:
            return -1
        

    def check(self, number):
        """
        :type number: int
        :rtype: bool
        """
        if number >= self.slot_count:
            return True
        else:
            return self.current_slot_list[number]
        

    def release(self, number):
        """
        :type number: int
        :rtype: None
        """
        if number >= self.slot_count:
            return
        elif self.current_slot_list[number] == True:
            return
        else:
            self.current_slot_list[number] = True
            self.empty_slot_list.append(number)

        


# Your PhoneDirectory object will be instantiated and called as such:
# obj = PhoneDirectory(maxNumbers)
# param_1 = obj.get()
# param_2 = obj.check(number)
# obj.release(number)