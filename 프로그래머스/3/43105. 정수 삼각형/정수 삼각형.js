
function solution(triangle) {
    let maxDepth = triangle.length
    let dp = triangle.map(layer => layer.map(element => 0))
    dp[0][0] = triangle[0][0]
    for(let currentDepth = 1 ; currentDepth < maxDepth ; currentDepth ++){
        triangle[currentDepth].forEach((element,index) => {
            let currentVal = triangle[currentDepth][index]
            if(index === 0 ) {
                dp[currentDepth][index] = currentVal + dp[currentDepth-1][index] 
            }
            else if(index === currentDepth){
                dp[currentDepth][index] = currentVal + dp[currentDepth-1][index-1]
            }
            else{
                let parentVal = getMax(dp[currentDepth-1][index-1], dp[currentDepth-1][index])
                dp[currentDepth][index] = currentVal + parentVal
            }
        })
    }
    let answer = dp[maxDepth-1].reduce((max,current) => max <= current ? current : max , 0)
    return answer
}
function getMax (a,b){
    return a >= b ? a : b
}
 // function dfs(currentDepth,currentIndex, accumVal){
//     let currentVal = triangle[currentDepth][currentIndex]
//     if(currentDepth == maxDepth-1){
//         answer = Math.max(answer,accumVal + currentVal)
//     }
//     else{
//         dfs(currentDepth+1,currentIndex,accumVal + currentVal)
//         dfs(currentDepth+1,currentIndex+1,accumVal + currentVal)
//     }
// }


