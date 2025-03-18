
function solution(n, t, m, p) {
    var answer = '';
    var totalStr = ''
    var index = 0
    while(totalStr.length <= m*t){
        totalStr = `${totalStr}${Number(index).toString(n)}`
        index++
    }
    totalStr = totalStr.toUpperCase()
    console.log(totalStr)
    for(let i = 0 ; i<t ;i++){
        answer = `${answer}${totalStr[i*m+(p-1)]}`

    }
    
    
    return answer;
}
