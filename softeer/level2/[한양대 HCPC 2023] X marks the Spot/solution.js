const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
rl.on("line", (line) => {
  input.push(line.trim().split(" "));
}).on("close", () => {
  let n = input[0][0];
  let result = "";
  for (let i = 1; i <= n; i++) {
    let [first, second] = input[i];
    let foundIndex = first.search(new RegExp("x", "i"));
    result += second[foundIndex].toUpperCase();
  }
  console.log(result);
});
