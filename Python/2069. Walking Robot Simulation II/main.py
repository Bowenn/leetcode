
from typing import List

facing2Str = ["North", "East", "South", "West"]

class Robot:
    posY: int = 0
    posX: int = 0
    facing: int = 1 # 0 - North, 1 - East, 2 - South, 3 - West

    mapWidth: int
    mapHeight: int
    roundDistance: int

    def __init__(self, width: int, height: int):
        self.mapWidth = width
        self.mapHeight = height
        self.roundDistance = (width - 1) * 2 + (height - 1) * 2 

    def step(self, num: int) -> None:
        # move step
        if self.facing == 0:
            # is at the edge and going around
            if num > self.roundDistance and self.posX == self.mapWidth - 1:
                num = num % self.roundDistance
                if num == 0 and self.posY == 0:
                    self.facing = 1
            availableSpace = self.mapHeight - 1 - self.posY
            if num > availableSpace:
                self.posY = self.mapHeight - 1
                self.facing = 3
                self.step(num - availableSpace)
            else:
                self.posY += num
        
        elif self.facing == 2:
            # is at the edge and going around
            if num > self.roundDistance and self.posX == 0:
                num = num % self.roundDistance
                if num == 0 and self.posY == self.mapHeight - 1:
                    self.facing = 3
            availableSpace = self.posY
            if num > availableSpace:
                self.posY = 0
                self.facing = 1
                self.step(num - availableSpace)
            else:
                self.posY -= num
        
        elif self.facing == 1:
            # is at the edge and going around
            if num > self.roundDistance and self.posY == 0:
                num = num % self.roundDistance
                if num == 0 and self.posX == 0:
                    self.facing = 2
            availableSpace = self.mapWidth - 1 - self.posX
            if num > availableSpace:
                self.posX = self.mapWidth - 1
                self.facing = 0
                self.step(num - availableSpace)
            else:
                self.posX += num

        elif self.facing == 3:
            # is at the edge and going around
            if num > self.roundDistance and self.posY == self.mapHeight - 1:
                num = num % self.roundDistance
                if num == 0 and self.posX == self.mapWidth - 1:
                    self.facing = 0
            availableSpace = self.posX
            if num > availableSpace:
                self.posX = 0
                self.facing = 2
                self.step(num - availableSpace)
            else:
                self.posX -= num

    def getPos(self) -> List[int]:
        return [self.posX, self.posY]
        

    def getDir(self) -> str:
        return facing2Str[self.facing]
        


# Your Robot object will be instantiated and called as such:
# obj = Robot(width, height)
# obj.step(num)
# param_2 = obj.getPos()
# param_3 = obj.getDir()