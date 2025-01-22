function solution(cards) {
    var cardsLength = cards.length
    var found = []
    var cardGroup = [0,0]
    for(var i = 0 ; i<cardsLength ; i++){
        found.push(false)
    }

    cards.forEach((element,index) => {
        var currentBox = index
        var groupArray = []
        while(found[currentBox] === false){
            groupArray.push(currentBox)
            found[currentBox] = true
            var currentCard = cards[currentBox]
            currentBox = currentCard - 1
        }
        var count = groupArray.length

        if(cardGroup[0] <= count){
            if(cardGroup[1] <= count){
                cardGroup[0] = cardGroup[1]
                cardGroup[1] = count
            }
            else{
                cardGroup[0] = count
            }
        }
    })
    var answer = cardGroup[0] * cardGroup[1]

    return answer
}