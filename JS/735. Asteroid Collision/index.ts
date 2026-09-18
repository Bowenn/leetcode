function asteroidCollision(asteroids: number[]): number[] {
    const rightMovingStack: number[] = [];

    for (const size of asteroids) {
        if (size < 0) {
            while (rightMovingStack.length > 0
                && rightMovingStack[rightMovingStack.length - 1] > 0
                && rightMovingStack[rightMovingStack.length - 1] < -size

            ) {
                rightMovingStack.pop();
            }
            if (rightMovingStack.length === 0 || rightMovingStack[rightMovingStack.length - 1] < 0) {
                rightMovingStack.push(size);
            }
            else if (rightMovingStack[rightMovingStack.length - 1] === -size) {
                rightMovingStack.pop();
                continue;
            }
        }
        else {
            rightMovingStack.push(size);
        }
    }

    return rightMovingStack;
};
