function solution(s) {
    const length = s.length
    var arr = []
    for(var i = 0 ; i<length ; i++){
        arr.push(s[i])
    }
    arr = arr.sort((front,rear) => {return rear.charCodeAt() - front.charCodeAt()} )
    var answer = arr.reduce((cumStr, currentChar) => {return cumStr+currentChar},'')
    return answer;
}