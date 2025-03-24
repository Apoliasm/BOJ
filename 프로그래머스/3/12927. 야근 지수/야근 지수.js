function solution(n, works) {
    
    let currentWorks = [...works]
    for(let i = 0 ; i< n ; i++){
        let [maxElement, maxIndex] = currentWorks.reduce((prev,element,index)=>{
            if(prev[0] < element){
                return [element,index]
            }
            else{
                return prev
            }
        },[0,0])
        if(currentWorks[maxIndex] > 0){
            currentWorks[maxIndex] -= 1
        }
        
    }
    let result = currentWorks.reduce((prev,element) => prev+element*element,0)
    return result;
}

//그리디
//n시간 했을 때 최소
//n-1시간 최소 + 다음 1시간 선택 = n시간 최소?
//이게 맞다면 DP적용
//한 시간 씩 쪼개보면 a < b 일 때 b를 하나 빼는게 감소 폭 더 큼
//가장 큰 걸 지우기?