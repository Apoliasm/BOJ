const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
let input = "",
  bomb = "";
lineCount = 0;
readline
  .on("line", (line) => {
    if (lineCount === 0) {
      input = line.trim();
      lineCount += 1;
    } else {
      bomb = line.trim();
      readline.close();
    }
  })
  .on("close", () => {
    let strStack = [];
    let bombIndexStack = [0];
    for (let i = 0; i < input.length; i++) {
      let currentInput = input.charAt(i);
      strStack.push(currentInput);
      let bombIndex = bombIndexStack[bombIndexStack.length - 1];
      if (currentInput === bomb.charAt(bombIndex)) {
        bombIndex += 1;
      } else if (currentInput === bomb.charAt(0)) {
        bombIndex = 1;
      } else {
        bombIndex = 0;
      }
      bombIndexStack.push(bombIndex);

      if (bombIndex === bomb.length) {
        for (let b = 0; b < bombIndex; b++) {
          bombIndexStack.pop();
          strStack.pop();
        }
      }
    }
    if (strStack.length === 0) {
      console.log("FRULA");
    } else {
      console.log(strStack.join(""));
    }
  });

/**
 *
 * stack
 * 중첩되는 구조
 * 이미 아닌 것들은 봂 필요도 없는 구조
 * stack을 떠올리기
 *
mirkovC84nizC8CC84844
C84
 * mirkovniz
 * 0
 *
 * 그 인덱스인지 판단, 아니면 [0]인지 판단
 *
 */
