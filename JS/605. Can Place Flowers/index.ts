function canPlaceFlowers(flowerbed: number[], n: number): boolean {
    for (let i = 0; i < flowerbed.length; i++) {
        if (flowerbed[i] === 0
            && (flowerbed[i - 1] === 0 || i - 1 < 0)
            && (flowerbed[i + 1] === 0 || i + 1 >= flowerbed.length)
        ) {
            flowerbed[i] = 1;
            n--;
            i++;
        }
        if (n <= 0) {
            return true;
        }
    }
    return false;
};
