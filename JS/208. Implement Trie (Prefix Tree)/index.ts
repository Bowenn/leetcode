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
    constructor() {
        this.root = new TrieNode('', false);
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

    search(word: string): boolean {
        let curNode = this.root;
        for (let i = 0; i < word.length; i++) {
            const charCode = word.charCodeAt(i) - CHAR_CODE_BASE;
            const nextNode = curNode.children[charCode];
            if (!nextNode) {
                return false;
            }
            curNode = nextNode;
        }
        return curNode.isWord;
    }

    startsWith(prefix: string): boolean {
        let curNode = this.root;
        for (let i = 0; i < prefix.length; i++) {
            const charCode = prefix.charCodeAt(i) - CHAR_CODE_BASE;
            const nextNode = curNode.children[charCode];
            if (!nextNode) {
                return false;
            }
            curNode = nextNode;
        }
        return true;
    }
}

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
