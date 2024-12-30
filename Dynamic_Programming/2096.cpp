#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

vector<vector<int>> maxV;
vector<vector<int>> minV;

void inputVector(int n){
    int input1,input2,input3;

    for(int i = 1 ; i<= n ; i++){
        cin>>input1>>input2>>input3;
        minV[1][0] = min(minV[0][0], minV[0][1] ) + input1;
        minV[1][1] = min(min(minV[0][0],minV[0][1]),minV[0][2]) + input2;
        minV[1][2] = min(minV[0][1], minV[0][2] ) + input3;
        maxV[1][0] = max(maxV[0][0], maxV[0][1] ) + input1;
        maxV[1][1] = max(max(maxV[0][0],maxV[0][1]),maxV[0][2]) + input2;
        maxV[1][2] = max(maxV[0][1], maxV[0][2] ) + input3;
        
        for(int j = 0 ; j<3; j++){
            maxV[0][j] = maxV[1][j];
            minV[0][j] = minV[1][j];
        }
    }
}

pair<int,int> getResult(int n){
    pair<int,int> result;
    result.first = *max_element(maxV[0].begin(),maxV[0].end());
    result.second = *min_element(minV[0].begin(),minV[0].end());
    return result;
}

int main(){
    ios::sync_with_stdio(0);
    cin.tie(0);
    cout.tie(0);
    int n;
    cin>> n;
    maxV = vector<vector<int>> (2,vector<int>(3));
    minV = vector<vector<int>> (2,vector<int>(3));
    for(int i = 0 ; i<3; i++){
        maxV[0][i] = 0;
        minV[0][i] = 0;
    }
    inputVector(n);
    pair<int,int> result = getResult(n);
    cout<< result.first <<" "<<result.second;
}