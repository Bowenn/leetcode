
// time complexity: O(m * n), space complexity: O(m * n)
function longestCommonSubsequence(text1: string, text2: string): number {
    const m = text1.length;
    const n = text2.length;

    const memory = Array.from({ length: m }, () => Array(n).fill(-1));

    const findCommonSubsequence = (l1: number, l2: number): number => {
        if (l1 >= m || l2 >= n) {
            return 0;
        }
        if (memory[l1][l2] >= 0) {
            return memory[l1][l2];
        }
        for (let i = l2; i < n; i++) {
            if (text1[l1] === text2[i]) {
                const res = Math.max(
                    findCommonSubsequence(l1 + 1, l2),
                    findCommonSubsequence(l1 + 1, i + 1) + 1
                );
                memory[l1][l2] = res;
                return res;
            }
        }
        const res = findCommonSubsequence(l1 + 1, l2);
        memory[l1][l2] = res;
        return res;
    };

    return findCommonSubsequence(0, 0);
};

// time complexity: O(m * n), space complexity: O(n)
function longestCommonSubsequence2(text1: string, text2: string): number {
    const m = text1.length;
    const n = text2.length;

    const dpRow = Array(n).fill(0);

    for (let i = m - 1; i >= 0; i--) {
        const oldRow = dpRow.slice();
        for (let j = n - 1; j >= 0; j--) {
            if (text1[i] === text2[j]) {
                dpRow[j] = Math.max((oldRow[j + 1] || 0) + 1, oldRow[j]);
            }
            else {
                dpRow[j] = Math.max(oldRow[j], dpRow[j + 1] || 0);
            }
        }
    }

    return dpRow[0];
};

// time: O(m * n), space complexity: O(n)
// 1D DP with rolling array
function longestCommonSubsequence3(text1: string, text2: string): number {
    const m = text1.length;
    const n = text2.length;

    const dpRow = Array(n).fill(0);

    for (let i = m - 1; i >= 0; i--) {
        let prev = 0;
        for (let j = n - 1; j >= 0; j--) {
            const temp = dpRow[j];
            if (text1[i] === text2[j]) {
                dpRow[j] = Math.max(prev + 1, dpRow[j]);
            }
            else {
                dpRow[j] = Math.max(dpRow[j], dpRow[j + 1] || 0);
            }
            prev = temp;
        }
    }

    return dpRow[0];
};
