function solution(priorities, location) {
    let order = 0
    const priorityArray = priorities.map((element,index)=> {
        return {value:element,index:index}
    })
    
    do{
        var front = priorityArray.shift()
        while(!checkMax(priorityArray,front)){
            priorityArray.push(front)
            front = priorityArray.shift()
        }
        order ++
    }while(front.index !== location);
    
    
    
    return order
}

function checkMax(array,front){
    for(let i = 0 ; i<array.length; i++){
        if(array[i].value > front.value){
            return false
        }
    }
    return true
}

