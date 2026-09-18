function successfulPairs(spells: number[], potions: number[], success: number): number[] {
    potions.sort((a, b) => a - b);
    let left = 0;
    let right = potions.length - 1;

    return spells.map((s, i) => {
        if (i !== 0) {
            if (s > spells[i - 1]) {
                left = 0;
            }
            else {
                right = potions.length - 1;
            }
        }
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (s * potions[mid] >= success) {
                right = mid - 1;
            }
            else {
                left = mid + 1;
            }
        }
        if (s * potions[left] >= success) {
            return potions.length - left;
        }
        return potions.length - left - 1;
    });
};
