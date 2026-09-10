function gcdOfStrings(str1: string, str2: string): string {
    // optional optimization: if str1 + str2 !== str2 + str1, return ''
    // if (str1 + str2 !== str2 + str1) {
    //     return '';
    // }

    let len1 = str1.length;
    let len2 = str2.length;
    let tLength = 0;

    // optional optimization: use % instead of subtraction to find the GCD of lengths
    // while (len1 !== 0 && len2 !== 0) {
    //     if (len1 > len2) {
    //         len1 = len1 % len2;
    //     } else {
    //         len2 = len2 % len1;
    //     }
    // }
    while (true) {
        if (len1 === 0 || len2 === 0) {
            return '';
        }
        else if (len1 === len2) {
            tLength = len1;
            break;
        }
        const gap = len2 - len1;
        if (gap >= 0) {
            len2 = gap;
        }
        else {
            len1 = -gap;
        }
    }

    for (let i = 0; i < str1.length; i++) {
        if (str1[i] !== str1[i % tLength]) {
            return '';
        }
    }

    for (let i = 0; i < str2.length; i++) {
        if (str2[i] !== str1[i % tLength]) {
            return '';
        }
    }

    return str1.slice(0, tLength);
};
