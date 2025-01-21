function solution(record) {
    var userInfo = {}
    var answer = [];
    record.forEach(message => {
        const messageArray = message.split(' ')
        if(messageArray[0] === 'Enter' || messageArray[0] === 'Change'){
            userInfo[messageArray[1]] = messageArray[2];
        }
    })
    record.forEach(message => {
        const messageArray = message.split(' ')
        var chatInfo = ""
        if(messageArray[0] !== "Change"){
            var currentId = messageArray[1]
            var textAction = (messageArray[0] === 'Enter' ? "들어왔습니다." :"나갔습니다.")
            var currentName = userInfo[currentId]
            answer.push(`${currentName}님이 ${textAction}`)
        }
    })
    return answer;
}