#include <iostream>
#include <vector>

using namespace std;
vector<int> tanghuru;

void inputTanghuru(int n){
    for(int i = 0; i< n ; i++){
        cin>>tanghuru[i];
    }
}

int travel(int forward,int n){

    int maxLength = 0;
    int currentLength = 1;
    int continuousLength = 1;
    int beforeFruitType = 0;
    int currentFruitType = 0;
    int nextFruitType = 0;
    int currentIndex = 0;
    
    if(forward == 1) 
        currentIndex = 0;
    else
        currentIndex = n-1;
    int iterate = 1;
    for(int i = 1 ; i< n ; i++){
        beforeFruitType = currentFruitType;
        currentFruitType = tanghuru[currentIndex];
        nextFruitType = tanghuru[currentIndex + forward] ;
        currentLength = continuousLength + 1;
        if(nextFruitType == currentFruitType){
            continuousLength += 1;
        }
        else if (nextFruitType == beforeFruitType){
            continuousLength = 1;
        }
        else{
            maxLength = max(maxLength, currentLength);
            
            continuousLength = 1;
        }
        currentIndex += forward;
        
    }
    maxLength = max(maxLength, currentLength);
    
    return maxLength;
}
int main(){
    ios::sync_with_stdio(0);
    cin.tie(0);
    cout.tie(0);
    int n;
    cin>>n;
    tanghuru = vector<int> (n);
    inputTanghuru(n);
    int result =  max (travel(1,n),travel(-1,n));
    cout <<result;
}  
/*
11
5 1 1 2 1 1 2 4 5 6 7
*/ 