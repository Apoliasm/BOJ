function solution(A, B) {
    A.sort((a,b) => a - b)
    B.sort((a,b) => a - b)
    let win = 0 ;
    let aIndex = 0
    let bIndex =0 
    while(aIndex < A.length && bIndex<B.length){
        if(A[aIndex] < B[bIndex]){
            win += 1
            aIndex += 1
        }
        bIndex += 1;
        
    }
    //1 3 5 7
    //2 2 6 8
    //이기면 넘어가고
    //지면 뒤에거 불러와서 비교
    
    return win
}
