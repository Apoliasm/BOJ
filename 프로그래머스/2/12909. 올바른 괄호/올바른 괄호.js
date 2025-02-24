function solution(s){
    const queue = []
    let answer = true
    for(let i = 0 ; i<s.length ; i++){
        let char = s.charAt(i)
        if(char === '('){
            queue.push(char)
        }
        else{
            if(queue.length === 0 ){
                answer = false
                break;
            }
            else{
                queue.shift()
            }
        }
    }
    if(queue.length !== 0){
        answer = false
    }
    return answer
}