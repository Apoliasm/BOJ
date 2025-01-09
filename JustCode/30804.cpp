#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;


vector<int> tanghuru;
vector<int> counter;

int twoPointer(int n){
    int start = 0, end = 0;
    int maxLength = 0;
    int front,back,length = 0;
    while(start <= end && end < n){
        counter[tanghuru[end]] += 1;
        end++;
        while( 10 - count(counter.begin(),counter.end(),0) > 2)
            counter[tanghuru[start++]] -- ;
        maxLength = max(maxLength,end-start);
    }

    return maxLength;
}

int main(){
    ios::sync_with_stdio(0);
    cin.tie(0);
    cout.tie(0);
    int n;
    cin>>n;
    tanghuru = vector<int>(n);
    counter = vector<int> (10,0);
    for(int i = 0 ; i<n ; i ++){
        cin>>tanghuru[i];
    }
    int result = twoPointer(n);
    cout<<result;
}