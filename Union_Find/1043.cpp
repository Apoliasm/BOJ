#include <iostream>
#include <vector>
#include <queue>

using namespace std;

vector<vector<int>> graph;
vector<bool> trueMans;
vector<bool> visited;
vector<vector<int>> party;
queue<int> q1;

void inputTrueMans(){
    int t,tInput;
    cin>>t;
    for(int i = 0 ; i<t ; i++){
        cin>>tInput;
        graph[0].push_back(tInput);
        graph[tInput].push_back(0);
    }
}

void inputParties(int m){
    int fisrtInput,currentinput,peoples;
    for(int i = 0 ; i< m; i++){
        cin>>peoples;
        cin>>fisrtInput;
        party[i].push_back(fisrtInput);
        for(int j = 1; j<peoples ; j++){
            cin>>currentinput;
            party[i].push_back(currentinput);
            graph[fisrtInput].push_back(currentinput);
            graph[currentinput].push_back(fisrtInput);
            fisrtInput = currentinput;
        }
    }
}

void filterTrueMans_BFS(int n){
    visited = vector<bool> (n+1,false);
    q1.push(0);
    int top;
    while(!q1.empty()){
        top = q1.front();
        q1.pop();
        if(visited[top])
            continue;
        visited[top] = true;
        trueMans[top] = true;
        for(auto it : graph[top]){
            if(!visited[it]){
                q1.push(it);
            }
        }
    }
}

bool getPartyGo(int partyIndex){
    for(auto it : party[partyIndex]){
        if(trueMans[it])
            return false;
    }
    return true;
}

int getMaximum(int m){
    int result = 0;
    for(int i = 0 ; i<m ; i++){
        if(getPartyGo(i)) result++;
    }
    return result;
}
int main(){
    ios::sync_with_stdio(0);
    cin.tie(0);
    cout.tie(0);
    int n,m,result;
    cin>>n>>m;
    graph = vector<vector<int>> (n+1,vector<int>());
    trueMans = vector<bool> (n+1,false);
    party = vector<vector<int>> (m,vector<int>());
    inputTrueMans();
    inputParties(m);
    filterTrueMans_BFS(n);
    result=  getMaximum(m);
    cout<<result;
}