#include <iostream>
#include <unordered_map>
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
    
    return 0;
}