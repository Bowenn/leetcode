#include <iostream>

struct Base { virtual ~Base() = default; };
struct Derived : Base { void hello() {} };

int main() {
    // static_cast: safe compile-time conversions
    double pi = 3.14;
    int n = static_cast<int>(pi); // numeric conversion: 3

    Base* b = new Derived();
    Derived* d1 = static_cast<Derived*>(b); // downcast (no runtime check)

    // reinterpret_cast: low-level, bitwise reinterpretation (dangerous)
    std::uintptr_t raw = reinterpret_cast<std::uintptr_t>(b); // pointer -> integer
    Base* b2 = reinterpret_cast<Base*>(raw);                  // integer -> pointer

    // const_cast: add/remove const/volatile qualifiers
    const int x = 42;
    const int* px = &x;
    int* px2 = const_cast<int*>(px); // remove const (unsafe if x truly const)

    // Safe use of const_cast: original object is non-const
    int y = 7;
    const int* py = &y;
    int* py2 = const_cast<int*>(py); // OK, y is actually non-const
    *py2 = 9; // modifies y

    delete b;
}
