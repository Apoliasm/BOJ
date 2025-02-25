function solution(s) {
    var currentS = s
    var answer = []
    var count = 0
    var removed = 0
    while(currentS !== '1'){
        count += 1
        var removeZero = currentS.split('').reduce((remain,element) => {
            if(element === '0'){
                removed++
                return remain
            }
            else{
                return `${remain}${element}`
            }
        },'')
        var c = removeZero.length
        var currentS = ''
        while(c !== 0){
            if(c % 2 === 0){
                currentS = `0${currentS}`
            }
            else{
                currentS = `1${currentS}`
            }
            c = parseInt(c / 2)
        }
        
    }
     
    return [count,removed]
}