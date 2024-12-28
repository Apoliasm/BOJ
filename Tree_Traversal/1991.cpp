#include <iostream>
#include <map>

using namespace std;

struct node{
    char nodeName;
    struct node* left;
    struct node* right;
}typedef node;
map<char,node*> dict;


void inputDict(int n){
    char head, left, right;
    for(int i = 0 ; i< n ; i++){
        cin>>head>>left>>right;
        map<char,node*>::iterator it;
        node* leftNode,*rightNode,*headNode;
        if((it=dict.find(head)) == dict.end()){
            headNode = new node({head,nullptr,nullptr});
            dict[head] = headNode;
        }
        else{
            headNode = (*it).second;
        }
        if(left != '.'){
            if((it = dict.find(left)) == dict.end()){
                leftNode = new node({left,nullptr,nullptr});
                dict[left] = leftNode; 
            }
            else{
                leftNode = (*it).second;
            }
            headNode->left = leftNode;
        }
        if(right != '.'){
            if((it = dict.find(right)) == dict.end()){
                rightNode = new node({right,nullptr,nullptr});
                dict[right] = rightNode;
            }
            else{
                rightNode = (*it).second;
            }
            headNode->right = rightNode;
        }
    }
}

//전위 순회(preorder) 루트를 가장 먼저 
//루트 - 왼쪽 - 오른쪽 순서
void preorder(node* root){
    cout<<root->nodeName;
    if(root->left != nullptr){
        preorder(root->left);
    }
    if(root->right != nullptr){
        preorder(root->right);
    }
}

//중위 순회(inorder) 루트 중간
// 왼쪽 - 루트 - 오른쪽 순서
void inorder(node* root){
    if(root->left != nullptr){
        inorder(root->left);
    }
    cout<<root->nodeName;
    if(root->right != nullptr){
        inorder(root->right);
    }
}

//후위 순회(postorder) 루트를 마지막으로
// 왼쪽- 오른쪽 -루트 순서
void postorder(node* root){
    if(root->left != nullptr){
        postorder(root->left);
    }
    if(root->right != nullptr){
        postorder(root->right);
    }
    cout<<root->nodeName;
}


int main(){
    ios::sync_with_stdio(0);
    cin.tie(0);
    cout.tie(0);
    int n ;
    cin>>n;
    inputDict(n);
    node* root = dict.at('A');
    preorder(root);
    cout<<'\n';
    inorder(root);
    cout<<'\n';
    postorder(root);

    return 0;

}