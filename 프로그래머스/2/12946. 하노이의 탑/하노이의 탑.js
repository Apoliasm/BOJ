function solution(n) {
    return getHanoi(1,3,2,n)
}

function getHanoi(src,dest,other,layer){
    if(layer === 1){
        return [[src,dest]]
    }
    else{
        return [...getHanoi(src,other,dest,layer-1),[src,dest],...getHanoi(other,dest,src,layer-1)]
    }
}