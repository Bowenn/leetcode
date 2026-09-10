function mergeAlternately(word1: string, word2: string): string {
    const resArr = [];

    let i = 0;

    while (true) {
        if (word1[i]) {
            resArr.push(word1[i]);
        }
        else {
            resArr.push(word2.slice(i));
            break;
        }
        if (word2[i]) {
            resArr.push(word2[i]);
        }
        else {
            resArr.push(word1.slice(i + 1));
            break;
        }
        i++;
    }

    return resArr.join('');
};
