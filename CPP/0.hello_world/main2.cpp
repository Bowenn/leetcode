#include <iostream>

struct Base { virtual ~Base() = default; };
struct Derived : Base { void hello() {} };


void main2() {

    // 1) static_cast vs reinterpret_cast: DIFFERENT RESULTS
    float f = 3.14f;

    int a = static_cast<int>(f);          // a = 3        (correct numeric conversion)
    int b = *reinterpret_cast<int*>(&f);  // b = 1078523331 (raw IEEE-754 bits!)
    //      ^^^ completely wrong if you wanted the number 3

    // 2) reinterpret_cast compiles dangerous nonsense that static_cast blocks
    std::string s = "hello";
    int* p = reinterpret_cast<int*>(&s);  // compiles! but *p is garbage/crash
    int* q = static_cast<int*>(&s);       // COMPILE ERROR — catches the mistake

    // 3) const_cast is the ONLY one that can remove const
    const int x = 42;
    const int* px = &x;
    int* p1 = static_cast<int*>(px);      // COMPILE ERROR
    int* p2 = reinterpret_cast<int*>(px); // COMPILE ERROR
    int* p3 = const_cast<int*>(px);       // OK — this is what const_cast is for
}

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
    *px2 = 100; // undefined behavior if x is actually const

    // Safe use of const_cast: original object is non-const
    int y = 7;
    const int* py = &y;
    int* py2 = const_cast<int*>(py); // OK, y is actually non-const
    *py2 = 9; // modifies y
    delete b;
}
