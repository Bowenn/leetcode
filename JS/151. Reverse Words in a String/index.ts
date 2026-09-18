function reverseWords(s: string): string {
    return s.split(' ')
        .filter(seg => seg !== '')
        .reverse()
        .join(' ');
};
