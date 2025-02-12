function solution(s) {
    const splited = s.trim().split(' ').map(element => parseInt(element,10))
    const [min,max]=splited.reduce(([initMin, initMax],intElement) => {
        if(intElement < initMin){
            return [intElement,initMax]
        }
        else if(intElement > initMax){
            return [initMin, intElement]
        }
        return [initMin, initMax]
    },[ splited[0],splited[0] ])
    return `${min} ${max}`
}