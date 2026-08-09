

from typing import List

# time: O(v + n), space: O(n)
class Solution:
    def pourWater(self, heights: List[int], volume: int, k: int) -> List[int]:
        n = len(heights)
        l = k
        r = k
        baseHeight = heights[k]
        INF_HEIGHT = 3000 # use 3000 to represent Infinity, because max height would be less than 2100

        def fillLeftGap():
            nonlocal heights, volume, l, baseHeight
            if l == -1:
                return
            lStack = [l]
            while True:
                l -= 1
                curHeight = INF_HEIGHT if l == -1 else heights[l]
                if curHeight < heights[lStack[-1]]:
                    lStack.append(l)
                elif curHeight == heights[lStack[-1]]:
                    lStack[-1] = l
                else:
                    while curHeight > heights[lStack[-1]]:
                        if len(lStack) <= 1:
                            return
                        
                        waterBottom = heights[lStack.pop()]
                        targetHeight = min(curHeight, heights[lStack[-1]])
                        waterHeight = targetHeight - waterBottom
                        waterWidth = lStack[-1] - l - 1
                        waterNeeded = waterWidth * waterHeight

                        if volume >= waterNeeded:
                            volume -= waterNeeded
                            for i in range(l + 1, lStack[-1]):
                                heights[i] = targetHeight
                        else:
                            lowerHeight = volume // waterWidth + waterBottom
                            higherCount = volume % waterWidth
                            for i in range(l + 1, lStack[-1] - higherCount):
                                heights[i] = lowerHeight
                            for i in range(lStack[-1] - higherCount, lStack[-1]):
                                heights[i] = lowerHeight + 1
                            volume = 0
                            return
                        
                    if curHeight < heights[lStack[-1]]:
                        lStack.append(l)
                    elif curHeight == heights[lStack[-1]]:
                        lStack[-1] = l
        
        def fillRightGap():
            nonlocal heights, volume, r, baseHeight
            if r == n:
                return
            rStack = [r]
            while True:
                r += 1
                curHeight = INF_HEIGHT if r == n else heights[r]
                if curHeight < heights[rStack[-1]]:
                    rStack.append(r)
                elif curHeight == heights[rStack[-1]]:
                    rStack[-1] = r
                else:
                    while curHeight > heights[rStack[-1]]:
                        if len(rStack) <= 1:
                            return
                        
                        waterBottom = heights[rStack.pop()]
                        targetHeight = min(curHeight, heights[rStack[-1]])
                        waterHeight = targetHeight - waterBottom
                        waterWidth = r - rStack[-1] - 1
                        waterNeeded = waterWidth * waterHeight

                        if volume >= waterNeeded:
                            volume -= waterNeeded
                            for i in range(rStack[-1] + 1, r):
                                heights[i] = targetHeight
                        else:
                            lowerHeight = volume // waterWidth + waterBottom
                            higherCount = volume % waterWidth
                            for i in range(rStack[-1] + 1, rStack[-1] + 1 + higherCount):
                                heights[i] = lowerHeight + 1
                            for i in range(rStack[-1] + 1 + higherCount, r):
                                heights[i] = lowerHeight
                            volume = 0
                            return
                        
                    if curHeight < heights[rStack[-1]]:
                        rStack.append(r)
                    if curHeight == heights[rStack[-1]]:
                        rStack[-1] = r

        while True:
            # First, fill left
            lastL = l
            if l > -1 and heights[l] <= baseHeight:
                fillLeftGap()
                print(f"l filled from {lastL} to {l}")
                print(heights, volume)
                if volume == 0:
                    return heights
            
            # left full, fill right
            lastR = r
            if lastL == l and r < n and heights[r] <= baseHeight:
                fillRightGap()
                print(f"r filled from {lastR} to {r}")
                print(heights, volume)
                if volume == 0:
                    return heights
            
            # left full, right full, add middleHeight
            if lastL == l and lastR == r:
                volume -= 1
                baseHeight += 1
                heights[k] = baseHeight
                l = k
                r = k
                print(heights, volume)
                if volume == 0:
                    return heights


# I thought if a drop of water can slide to the right when it is [1,2,3,4,4,4,3,2,1]
#                                                                           ⬆
class BadSolution:
    def pourWater(self, heights: List[int], volume: int, k: int) -> List[int]:
        n = len(heights)
        l = k
        r = k
        baseHeight = heights[k]
        INF_HEIGHT = 3000 # use 3000 to represent Infinity, because max height would be less than 2100

        def fillLeftGap():
            nonlocal heights, volume, l, baseHeight
            lStack = [l]
            l = l - 1
            while True:
                if l >= 0:
                    if heights[l] < heights[lStack[-1]]:
                        lStack.append(l)
                        l -= 1
                        continue
                    elif heights[l] == heights[lStack[-1]]:
                        lStack[-1] = l
                        l -= 1
                        continue
                if l < -1:
                    l = -1
                    return
                lHeight = INF_HEIGHT if l == -1 else heights[l]
                while lHeight > heights[lStack[-1]]:
                    if len(lStack) > 1:
                        waterBottom = heights[lStack.pop()]
                        waterHeight = heights[lStack[-1]] - waterBottom
                        waterWidth = lStack[-1] - l - 1
                        waterNeeded = waterWidth * waterHeight
                        if volume > waterNeeded:
                            volume -= waterNeeded
                        elif volume == waterNeeded:
                            for i in range(l + 1, lStack[-1]):
                                heights[i] = heights[lStack[-1]]
                            volume = 0
                            return
                        else:
                            lowerHeight = volume // waterWidth + waterBottom
                            higherCount = volume % waterWidth
                            for i in range(l + 1, lStack[-1] - higherCount):
                                heights[i] = lowerHeight
                            for i in range(lStack[-1] - higherCount, lStack[-1]):
                                heights[i] = lowerHeight + 1
                            volume = 0
                            return
                    else:
                        break
                if lHeight > baseHeight:
                    break;
                l -= 1
        
        def fillRightGap():
            nonlocal heights, volume, r, baseHeight
            rStack = [r]
            r = r + 1
            while True:
                if r < n:
                    if heights[r] < heights[rStack[-1]]:
                        rStack.append(r)
                        r += 1
                        continue
                    elif heights[r] == heights[rStack[-1]]:
                        rStack[-1] = r
                        r += 1
                        continue
                if r > n:
                    r = n
                    return
                rHeight = INF_HEIGHT if r == n else heights[r]
                while rHeight > heights[rStack[-1]]:
                    if len(rStack) > 1:
                        waterBottom = heights[rStack.pop()]
                        waterHeight = heights[rStack[-1]] - waterBottom
                        waterWidth = r - 1 - rStack[-1]
                        waterNeeded = waterWidth * waterHeight
                        if volume > waterNeeded:
                            volume -= waterNeeded
                        elif volume == waterNeeded:
                            for i in range(rStack[-1] + 1, r + 1):
                                heights[i] = heights[rStack[-1]]
                            volume = 0
                            return
                        else:
                            lowerHeight = volume // waterWidth + waterBottom
                            higherCount = volume % waterWidth
                            for i in range(rStack[-1] + 1, rStack[-1] + 1 + higherCount):
                                heights[i] = lowerHeight + 1
                            for i in range(rStack[-1] + 1 + higherCount, r):
                                heights[i] = lowerHeight
                            volume = 0
                            return
                    else:
                        break
                if rHeight > baseHeight:
                    break;
                r += 1

        while True:
            # First, fill left
            lastL = l
            if heights[l] <= baseHeight:
                fillLeftGap()
                if volume == 0:
                    return heights
            
            # Then, fill right
            if heights[r] <= baseHeight:
                fillRightGap()
                if volume == 0:
                    for i in range(l + 1, lastL):
                        heights[i] = baseHeight
                    return heights
            
            # Then, keep pour water between l and r untill overflow
            waterWidth = r - l - 1
            leftHeight = INF_HEIGHT if l == -1 else heights[l]
            rightHeight = INF_HEIGHT if r == n else heights[r]
            targetHeight = min(leftHeight, rightHeight)
            waterNeeded = waterWidth * (targetHeight - baseHeight)
            if waterNeeded <= volume:
                for i in range(l + 1, r):
                    heights[i] = targetHeight
                baseHeight = targetHeight
                volume -= waterNeeded
            else:
                lowerHeight = volume // waterWidth + baseHeight
                higherCount = volume % waterWidth
                if higherCount >= k - l:
                    # for i in range(l + 1, k + higherCount - (k - l) + 1):
                    for i in range(l + 1, higherCount + l + 1):
                        heights[i] = lowerHeight + 1
                    for i in range(higherCount + l + 1, r):
                        heights[i] = lowerHeight
                    return heights
                else:
                    for i in range(l + 1, r):
                        if i <= k and i > k - higherCount:
                            heights[i] = lowerHeight + 1
                        else:
                            heights[i] = lowerHeight
                    return heights
            if volume == 0:
                return heights
