function removeStars(s: string): string {
    const strArr = s.split('');
    let tail = 0;
    for (let i = 0; i < strArr.length; i++) {
        if (strArr[i] === '*') {
            tail--;
        }
        else {
            strArr[tail] = strArr[i];
            tail++;
        }
    }
    return strArr.splice(0, tail).join('');
};
