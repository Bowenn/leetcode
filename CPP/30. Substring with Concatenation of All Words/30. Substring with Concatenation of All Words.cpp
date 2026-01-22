#include <vector>
#include <unordered_map>
#include <unordered_set>
#include <queue>
#include <iostream>

using namespace std;

class Solution {
public:
    vector<int> findSubstring(string s, vector<string>& words) {
        int stringLength = s.length();
        int wordLength = words[0].size();
        int wordCount = words.size();
        int totalWordSize = wordCount * wordLength;
        unordered_map<string_view, int> matchTarget;
        for (const string& w: words) {
            matchTarget[string_view(w)]++;
        }
        vector<int> res;

        /**
         * try to build a window by matching words one by one
         * if match fails, reset and continue from next piece
         * if match succeeds but over matches, keep matching until window built or match fails
         * if window built, record result and continue matching until match fails
         */
        for (int offsetBase = 0; offsetBase < wordLength; offsetBase++) { // word align offsetBase
            unordered_map<string_view, int> matched;
            queue<string_view> matchedQueue; // save words matched in order, so that we can pop later

            for (int i = 0; offsetBase + i * wordLength < stringLength; i++) {
                int offsetStart = offsetBase + i * wordLength;

                string_view subStr = string_view(s).substr(offsetStart, wordLength);
                if (matchTarget.count(subStr)) {
                    // success in matching a word
                    if (matched[subStr] < matchTarget[subStr]) { // not over match
                        matched[subStr]++;
                    }
                    else { // match count overflow
                        while (matchedQueue.front() != subStr) {
                            string_view frontWord = matchedQueue.front();
                            matched[frontWord]--;
                            matchedQueue.pop();
                        }
                        matchedQueue.pop();
                    }
                    matchedQueue.push(subStr);

                    if (matchedQueue.size() == wordCount) {
                        // success in matching all words exactly, window built
                        res.push_back(offsetStart - totalWordSize + wordLength);

                        // try to slide window to find more matches
                        string_view frontWord = matchedQueue.front();
                        matched[frontWord]--;
                        matchedQueue.pop();
                    }

                }
                else {
                    // window broken, reset and continue from next piece
                    matched.clear();
                    matchedQueue = queue<string_view>();
                }
            }
        }

        return res;
    }
};

class FasterSolution {
public:
    vector<int> findSubstring(string s, vector<string>& words) {
        vector<int> res;
        if (s.empty() || words.empty()) return res;
        
        int wordLen = words[0].size();
        int wordCount = words.size();
        int totalLen = wordLen * wordCount;
        
        if (s.size() < totalLen) return res;
        
        // Build frequency map once
        unordered_map<string_view, int> targetFreq;
        for (const string& w : words) {
            targetFreq[string_view(w)]++;
        }
        
        // Try each offset
        for (int offset = 0; offset < wordLen; offset++) {
            unordered_map<string_view, int> windowFreq;
            int matched = 0; // Count of words matched
            int left = offset;
            
            for (int right = offset; right + wordLen <= s.size(); right += wordLen) {
                string_view word = string_view(s).substr(right, wordLen);
                
                // Add word to window
                if (targetFreq.count(word)) {
                    windowFreq[word]++;
                    if (windowFreq[word] <= targetFreq[word]) {
                        matched++;
                    }
                    
                    // Shrink window if needed
                    while (windowFreq[word] > targetFreq[word]) {
                        string_view leftWord = string_view(s).substr(left, wordLen);
                        windowFreq[leftWord]--;
                        if (windowFreq[leftWord] < targetFreq[leftWord]) {
                            matched--;
                        }
                        left += wordLen;
                    }
                    
                    // Check if we have a valid window
                    if (matched == wordCount) {
                        res.push_back(left);
                        // Slide window
                        string_view leftWord = string_view(s).substr(left, wordLen);
                        windowFreq[leftWord]--;
                        matched--;
                        left += wordLen;
                    }
                } else {
                    // Reset window - word not in target
                    windowFreq.clear();
                    matched = 0;
                    left = right + wordLen;
                }
            }
        }
        
        return res;
    }
};


int main(){
    string s = "barfoothefoobarman";
    vector<string> words = {"foo", "bar"};
    vector<int> res = (new Solution())->findSubstring(s, words);

    copy(res.begin(), res.end(), ostream_iterator<int>(cout, " "));
    return 0;
}
