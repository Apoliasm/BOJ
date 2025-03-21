function solution(n, computers) {
    let answer = 0
    let visited = [...Array(n)].map(element =>  false)
    for(let i = 0 ; i< n; i++){
        if(visited[i] === false){
            dfs(i)
            answer++
        }
    }
    return answer
    
    
    function dfs(currentNode){
        visited[currentNode] = true
        computers[currentNode].forEach((adjNode,nodeIndex) => {
            if(adjNode === 1 && visited[nodeIndex]=== false){
                dfs(nodeIndex)
            }
        })
    }
    
}