function solution(begin, target, words) {
    words = words.map((word,index) => [word,index])
    var count = 1;
    var beginSplit = begin.split()
    let visited = [...words].map(element => false)
    var queue = words.reduce((prev,word) => {
        if(getDiffWord(begin,word[0]) === 1 && !visited[word[1]]){
            prev.push(word)
        }
        return prev
    },[])
    while(queue.length !== 0){
        
        let length = queue.length
        for(let i = 0 ; i<length ; i++){
            let [currentWord,index]= queue.shift()
            if(!visited[index]){
                visited[index] = true
                if(target === currentWord){
                    return count
                }
                else{
                    words.forEach(word=> {
                        if(getDiffWord(currentWord,word[0]) === 1 && !visited[word[1]]){
                            queue.push(word)
                        }
                    })
                }
            }    

        }
        count+=1
    }
    
    return 0;
}
function getDiffWord(wordA,wordB){
    let splitedWordA = wordA.split('')
    let diff = 0
    wordB.split('').forEach((char,index)=>{
        if(splitedWordA[index] !== char){
            diff+=1
        }
    })
    return diff
}