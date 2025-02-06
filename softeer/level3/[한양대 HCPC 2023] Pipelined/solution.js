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
  let items = [...input[1]];
  items = items.sort((a, b) => a - b);
  let minimum = items[0];
  let maximum = items[n - 1];
  let result = maximum + n - 1;
  console.log(result);
});
