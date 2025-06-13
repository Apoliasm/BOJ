const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let n = 0;
const dictionary = {};
let input = [];
let lineCount = 0;
let answer = 0;
readline
  .on("line", (line) => {
    if (lineCount == 0) {
      n = parseInt(line.trim());
      lineCount += 1;
    } else {
      input = line
        .trim()
        .split(" ")
        .map((num, numIndex) => {
          const parsedInt = parseInt(num);
          return Number(parsedInt);
        })
        .sort((a, b) => {
          return a - b;
        });
      readline.close();
    }
  })
  .on("close", () => {
    for (let currentIndex = 0; currentIndex < n; currentIndex++) {
      const currentNum = input[currentIndex];
      let start = 0,
        end = n - 1;
      while (start < end) {
        let sum = input[start] + input[end];
        if (sum == currentNum) {
          if (start != currentIndex && end != currentIndex) {
            answer += 1;
            break;
          }
          if (start === currentIndex) start += 1;
          if (end === currentIndex) end -= 1;
        } else if (sum > currentNum) end -= 1;
        else start += 1;
      }
    }

    console.log(answer);
  });

function isDiffIndex(num, numIndex) {
  const elementArr = dictionary[num]; // arr
  for (let elementIndex = 0; elementIndex < elementArr.length; elementIndex++) {
    const currentElement = elementArr[elementIndex];
    if (currentElement.index !== numIndex) {
      return true;
    }
  }
  return false;
}
