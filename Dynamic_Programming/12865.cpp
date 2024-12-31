#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

vector<vector<int>> knapsak;
vector<pair<int,int>> items;

void inputItems(int n){
    int weight,value;
    items.emplace_back(0,0);
    for(int i = 0 ; i< n; i++){
        cin>>weight>>value;
        items.emplace_back(weight,value);
    }
    sort(items.begin(),items.end());
}

int getKnapsak(int n, int myWeight){
    int result = 0 ;
    knapsak = vector<vector<int>> (myWeight+1,vector<int>(n+1,0));
    
    for(int currentWeight = 1 ; currentWeight<=myWeight ; currentWeight++)
    {
        for(int item = 1 ; item<= n ; item++)
        {
            knapsak[currentWeight][item] = knapsak[currentWeight][item-1];
            if(items[item].first <= currentWeight){
                knapsak[currentWeight][item] = max(knapsak[currentWeight][item] , knapsak[currentWeight-items[item].first][item-1] + items[item].second);
            }
            if(result < knapsak[currentWeight][item]){
                result = knapsak[currentWeight][item];
            }

        }
    }
    return result;
}

int main(){
    cin.tie(0);
    cout.tie(0);
    int n,myWeight;
    cin>>n>>myWeight;
    inputItems(n);
    int result = getKnapsak(n,myWeight);
    cout<<result;

}