export {};

class TrieNode {
    c: string;
    isWord: boolean;
    children: Array<TrieNode | null>;

    constructor(c: string, isWord: boolean) {
        this.c = c;
        this.isWord = isWord;
        this.children = Array.from({ length: 26 }, () => null);
    }
}

const CHAR_CODE_BASE = 'a'.charCodeAt(0);

class Trie {
    root: TrieNode;
    cachedSearchNode: TrieNode;
    cachedSearchPrefix: string = '';

    constructor() {
        this.root = new TrieNode('', false);
        this.cachedSearchNode = this.root;
    }

    insert(word: string): void {
        let curNode = this.root;
        for (let i = 0; i < word.length; i++) {
            const charCode = word.charCodeAt(i) - CHAR_CODE_BASE;
            let nextNode = curNode.children[charCode];
            if (!nextNode) {
                nextNode = new TrieNode(word[i], false);
                curNode.children[charCode] = nextNode;
            }
            curNode = nextNode;
        }
        curNode.isWord = true;
    }

    clearCache(): void {
        this.cachedSearchNode = this.root;
        this.cachedSearchPrefix = '';
    }

    appendSearch(char: string): string[] | null {
        const charIndex = char.charCodeAt(0) - CHAR_CODE_BASE;
        if (!this.cachedSearchNode.children[charIndex]) {
            this.clearCache();
            return null;
        }

        const searchRes: string[] = [];
        const dfsStack: string[] = [];
        const dfs3Words = (node: TrieNode): void => {
            if (searchRes.length >= 3) {
                return;
            }
            dfsStack.push(node.c);

            if (node.isWord) {
                searchRes.push(this.cachedSearchPrefix + dfsStack.join(''));
            }

            node.children.forEach(child => {
                if (child) {
                    dfs3Words(child);
                }
            });

            dfsStack.pop();
        };

        dfs3Words(this.cachedSearchNode.children[charIndex]);

        this.cachedSearchNode = this.cachedSearchNode.children[charIndex];
        this.cachedSearchPrefix += char;

        return searchRes;
    }
}

function suggestedProducts(products: string[], searchWord: string): string[][] {
    const myTrie = new Trie();
    products.forEach(p => myTrie.insert(p));

    const res: string[][] = Array(searchWord.length).fill([]); // it's safe to share same empty array here
    for (let i = 0; i < searchWord.length; i++) {
        const searchRes = myTrie.appendSearch(searchWord[i]);
        if (!searchRes) {
            break;
        }
        res[i] = searchRes;
    }

    return res;
};
