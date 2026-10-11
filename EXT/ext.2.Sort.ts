export {};

// time: O(n^2), space: O(1)
const bubbleSort = (arr: number[]): void => {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i; j < arr.length - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
};

// time: O(n log n), space: O(log n)
// worst case - time: O(n^2), space: O(n)
const quickSort = (arr: number[]): void => {
    const qs = (lIndex: number, rIndex: number) => {
        if (lIndex >= rIndex) {
            return;
        }

        let midIndex = lIndex;
        for (let i = lIndex + 1; i <= rIndex; i++) {
            if (arr[i] < arr[lIndex]) {
                const temp = arr[i];
                midIndex++;
                arr[i] = arr[midIndex];
                arr[midIndex] = temp;
            }
        }
        const temp = arr[midIndex];
        arr[midIndex] = arr[lIndex];
        arr[lIndex] = temp;

        qs(lIndex, midIndex - 1);
        qs(midIndex + 1, rIndex);
    };

    qs(0, arr.length - 1);
};

// time: O(n log n), space: O(n)
const mergeSort = (arr: number[]) => {
    const ms = (lIndex: number, rIndex: number): number[] => {
        if (lIndex > rIndex) {
            return [];
        }
        else if (lIndex === rIndex) {
            return [arr[lIndex]];
        }

        const midIndex = Math.floor((lIndex + rIndex) / 2);
        const leftPart = ms(lIndex, midIndex);
        const rightPart = ms(midIndex + 1, rIndex);

        const res = Array(rIndex - lIndex + 1);
        let l1 = 0;
        let l2 = 0;

        while (l1 < leftPart.length && l2 < rightPart.length) {
            if (leftPart[l1] < rightPart[l2]) {
                res[l1 + l2] = leftPart[l1];
                l1++;
            }
            else {
                res[l1 + l2] = rightPart[l2];
                l2++;
            }
        }

        while (l1 < leftPart.length) {
            res[l1 + l2] = leftPart[l1];
            l1++;
        }

        while (l2 < rightPart.length) {
            res[l1 + l2] = rightPart[l2];
            l2++;
        }

        return res;
    };
    return ms(0, arr.length - 1);
};

// time: O(n^2), space: O(1)
// worst case - time: O(n^2), space: O(1)
const shellSort = (arr: number[]): void => {
    let gap = Math.floor(arr.length / 2);
    
    while (gap >= 1) {
        for (let i = gap; i < arr.length; i++) {
            let j = i;
            while (j - gap >= 0 && arr[j - gap] > arr[j]) {
                const temp = arr[j];
                arr[j] = arr[j - gap];
                arr[j - gap] = temp;
                j -= gap;
            }
        }

        gap = Math.floor(gap / 2);
    }
};

// time: O(n + k * m log m), space: O(n + k)
// where k is the number of buckets, m is the number of elements in each bucket
// worst case - time: O(n log n), space: O(n + k)
const bucketSort = (arr: number[]): number[] => {
    const buckets: number[][] = Array.from({ length: 22 }, () => []); // 50 * 20 + another 2 buckets for 0- & 1000+

    arr.forEach(n => {
        const bucketIndex = n <= 0
            ? 0
            : n > 1000
                ? 21
                : Math.ceil(n / 50);
        buckets[bucketIndex].push(n);
    });

    buckets.forEach(bucket => {
        // Any sort method is ok. I will use quicksort here
        quickSort(bucket);
    });

    return buckets.flat();
};

