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
      .map((element) => {
        return parseInt(element, 10);
      })
  );
}).on("close", () => {
  let rowNum = input[0][0];
  let jigsaw = [];
  let result = [];
  for (let i = 1; i <= rowNum; i++) {
    jigsaw.push([...input[i]]);
    result.push([]);
    for (let j = 1; j <= rowNum; j++) {
      result[i - 1].push(0);
    }
  }
  for (let i = 0; i < rowNum; i++) {
    for (let j = 0; j < rowNum; j++) {
      result[i][j] = i + 1;
    }
  }
  for (let i = 0; i < rowNum; i++) {
    let str = "";
    for (let j = 0; j < rowNum; j++) {
      str += `${result[i][j].toString()} `;
    }
    console.log(str);
  }
  process.exit(0);
});
