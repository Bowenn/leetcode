#include <iostream>
#include <unordered_map>
#include <unordered_set>
#include <string_view>

using namespace std;

int main() {
    std::cout << "Hello, World!" << std::endl;

    int a = 3 / 2;
    std::cout << a << std::endl;
    std::cout << __cplusplus << std::endl;

    unordered_map<string_view, int> m;
    vector<string> words = {"hello", "world", "hello", "hello", "world"};
    std::cout << string_view(words[1]) << string_view(words[3]) << (string_view(words[1]) == string_view(words[3])) << std::endl;

    for (const string& w: words) {
        m[string_view(w)]++;
    }

    unordered_set<int> s;
    s.insert(1);
    s.insert(2);
    s.insert(2);
    s.insert(3);
    s.insert(3);
    s.insert(4);
    for (int n: s) {
        s.erase(n + 1);
        std::cout << n << std::endl;
    }

    unordered_map<int, unordered_map<int, long long>> mathResult;
    mathResult[1][2] = 11222;
    
    return 0;
}