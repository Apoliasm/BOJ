/**
2 4 6 9 12 18 일때
2와 4보다 작은 수 사이
2,3
2,3 최대 가능 수 > 4최대 가능 수

그냥 브루트 포스해도 1초 안넘을듯
*/

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
rl.on("line", (line) => {
  input.push(
    line
      .trim()
      .split(" ")
      .map((element) => parseInt(element, 10))
  );
}).on("close", () => {
  let n = input[0][0];
  let sortedArray = input[1].sort((a, b) => a - b);
  let min = sortedArray[0];
  let max = sortedArray[n - 1];
  let result = 0;
  for (let i = 2; i <= max; i++) {
    let currentNum = 0;
    sortedArray.forEach((element) => {
      if (element % i === 0) {
        currentNum += 1;
      }
    });
    result = result <= currentNum ? currentNum : result;
  }
  console.log(result);
  process.exit(0);
});
