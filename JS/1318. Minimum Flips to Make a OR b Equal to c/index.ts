function minFlips(a: number, b: number, c: number): number {
    let res = 0;
    while (c > 0) {
        if (c & 1) {
            a & 1 || b & 1 || res++;
        }
        else {
            a & 1 && res++;
            b & 1 && res++;
        }
        a >>= 1;
        b >>= 1;
        c >>= 1;
    }

    while (a > 0) {
        a & 1 && res++;
        a >>= 1;
    }

    while (b > 0) {
        b & 1 && res++;
        b >>= 1;
    }

    return res;
};
