#include <iostream>
#include <vector>
#include <queue>
using namespace std;

struct node{
    int dest;
    int weight;
}typedef node;

vector<vector<node>> graph;
priority_queue<pair<int,int>,vector<pair<int,int>>,greater<>> pq1;
vector<int> dist;

void initGraph(int src,int n){
    dist[src] = 0;
    pq1.push({0,src});
}

void updateNode(int dest){
    int currentDistance, currentNode,updatedDistance,neighborDistance;
    while(!pq1.empty()){
        currentDistance = pq1.top().first;
        currentNode = pq1.top().second;
        pq1.pop();

        if(dist[currentNode] < currentDistance)
            continue;

        for(auto it : graph[currentNode]){
            neighborDistance = dist[it.dest];
            updatedDistance = it.weight +currentDistance;
            if(neighborDistance > updatedDistance){
                dist[it.dest] = updatedDistance;
                pq1.push({updatedDistance,it.dest});
            }
            
        }

    }
}
int main(){
    ios::sync_with_stdio(0);
    cin.tie(0);
    cout.tie(0);
    int n,m,src,dest,a,b,weight;
    cin>>n>>m;
    graph = vector<vector<node>>(n+1);
    dist= vector<int>(n+1,INT32_MAX);
    for(int i = 0 ; i < m; i++){
        cin>>a>>b>>weight;
        graph[a].push_back({b,weight});
    }
    cin>>src>>dest;
    int currentDistance, currentNode;
    pq1 = priority_queue<pair<int,int>, vector<pair<int,int>>,greater<>> ();
    
    initGraph(src,n);
    updateNode(dest);

    cout<<dist[dest];
}