function solution(n) {
    var currentN = n
    var oneInN = getOneInN(currentN)
    while(true){
        currentN++
        let oneInCurrentN = getOneInN(currentN)
        if(oneInN === oneInCurrentN){
            break;
        }
        
    }
    return currentN;
}

function getOneInN(n){
    let nBinary = n.toString(2)
    return nBinary.match(/1/g).length
}