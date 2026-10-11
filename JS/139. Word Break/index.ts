export {};

class TrieNode {
    c: string;
    isWord: boolean;
    children: Map<string, TrieNode>;

    constructor(c: string) {
        this.c = c;
        this.isWord = false;
        this.children = new Map();
    }

    get(c: string) {
        return this.children.get(c);
    }
}

class Trie {
    root: TrieNode;

    constructor() {
        this.root = new TrieNode('');
    }

    insert(s: string): void {
        let curNode = this.root;
        for (let i = 0; i < s.length; i++) {
            if (curNode.children.has(s[i])) {
                curNode = curNode.children.get(s[i])!;
            }
            else {
                const newNode = new TrieNode(s[i]);
                curNode.children.set(s[i], newNode);
                curNode = newNode;
            }
        }
        curNode.isWord = true;
    }

    has(s: string): boolean {
        let curNode = this.root;
        for (let i = 0; i < s.length; i++) {
            if (curNode.children.has(s[i])) {
                curNode = curNode.children.get(s[i])!;
            }
            else {
                return false;
            }
        }
        return curNode.isWord;
    }
}

// O(n^2 + m * k) time, O(n + m * k) space
function wordBreak(s: string, wordDict: string[]): boolean {
    const myTrie = new Trie();
    for (let i = 0; i < wordDict.length; i++) {
        myTrie.insert(wordDict[i]);
    }

    // const reachable: number[] = [s.length];

    const reachable: boolean[] = Array(s.length).fill(false);
    const visited: boolean[] = Array(s.length).fill(false);
    reachable[0] = true;

    for (let i = 0; i < reachable.length; i++) {
        if (reachable[i] && !visited[i]) {
            visited[i] = true;
            let curNode: TrieNode | undefined = myTrie.root;
            let j = i;

            while (j < reachable.length && curNode) {
                curNode = curNode.get(s[j]);
                if (curNode?.isWord) {
                    if (j + 1 < reachable.length) {
                        reachable[j + 1] = true;
                    }
                    else {
                        return true;
                    }
                }
                j++;
            }
        }
    }

    return false;
};

// O(n^2 * k) time, O(n + m * k) space
function wordBreak2(s: string, wordDict: string[]): boolean {
    const myTrie = new Trie();
    for (let i = 0; i < wordDict.length; i++) {
        myTrie.insert(wordDict[i]);
    }

    const reachable: number[] = [s.length];

    for (let i = 0; i < s.length; i++) {
        for (let j = 0; j < reachable.length; j++) {
            if (s.length - 1 - i < reachable[j] - 20) { // wordDict[i].length <= 20
                continue;
            }
            const toSearch = s.substring(s.length - 1 - i, reachable[j]);
            if (myTrie.has(toSearch)) {
                reachable.push(s.length - 1 - i);
                break;
            }
        }
    }

    return reachable[reachable.length - 1] === 0;
};
