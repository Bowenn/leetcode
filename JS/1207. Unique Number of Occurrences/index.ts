function uniqueOccurrences(arr: number[]): boolean {
    const occurrences: Record<number, number> = {};
    arr.forEach(item => {
        if (item in occurrences) {
            occurrences[item]++;
        }
        else {
            occurrences[item] = 1;
        }
    });

    // optional optimization: check set size against object length
    // const countSet = new Set<number>(Object.values(occurrences));
    // if (countSet.size !== Object.keys(occurrences).length) {
    //     return false;
    // }

    const countSet = new Set<number>();
    // for (const [key, value] of Object.entries(occurrences)) {
    for (const value of Object.values(occurrences)) {
        if (countSet.has(value)) {
            return false;
        }
        countSet.add(value);
    }
    return true;
};
