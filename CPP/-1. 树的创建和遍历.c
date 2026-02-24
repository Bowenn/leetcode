//
//  main.c
//  myfirsttest
//
//  Created by xes on 2020/1/7.
//  Copyright © 2020 Thi. All rights reserved.
//
#include <stdio.h>
#include <stdlib.h>

struct Node{
    int v;
    struct Node* left;
    struct Node* right;
};

void add2Tree(struct Node*, int);
int printNode(struct Node*, int[]);

static int count = 0;   // 遍历时用于计数

int main(int argc, char* argv[]){
    int n = 1;
    scanf("%d", &n);   // 总数据个数n
    
    // 创建
    int x;
    scanf("%d", &x);
    count++;
    struct Node* root = malloc(sizeof(struct Node));
    root->v = x;
    root->right = NULL;
    root->left = NULL;
    while(count < n){
        scanf("%d", &x);
        add2Tree(root, x);
        count++;
    }
    
    // 先序遍历
    count = 0;
    int list[n];
    printNode(root, list);
    
    return 0;
}

// 添加结点方法
void add2Tree(struct Node* root, int v){
    if(v > root->v){
        if(root->right != NULL){
            add2Tree(root->right, v);
        }else{
            struct Node* d = (struct Node*) malloc(sizeof(struct Node));
            d->v = v;
            d->left = NULL;
            d->right = NULL;
            root->right = d;
        }
    }else if(v < root->v){
        if(root->left != NULL){
            add2Tree(root->left, v);
        }else{
            struct Node* d = malloc(sizeof(struct Node));;
            d->v = v;
            d->left = NULL;
            d->right = NULL;
            root->left = d;
        }
    }
}

// 遍历方法
int printNode(struct Node* node, int list[]){
    if(node->left != NULL){
        printNode(node->left, list);
    }
    
    printf("%d\n", node->v);
    list[count] = node->v;
    count++;

    if(node->right != NULL){
        printNode(node->right, list);
    }
    return 0;
}

/*

61
25
29
105
52
108
73
58
38
64
14
55
98
94
102
35
60
68
15
27
103
73
55
35
33
47
35
16
31
108
46
65
89
13
51
51
99
113
66
111
99
64
54
117
20
14
106
9
29
11
25
100
58
79
69
84
106
59
92
42
11
92

*/