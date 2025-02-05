const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

var input = "";
rl.on("line", (line) => {
  input = line.trim();
}).on("close", () => {
  const replaced = input
    .replace(new RegExp("\\(\\)", "g"), "(1)")
    .replace(new RegExp("\\)\\(", "g"), ")+(");

  console.log(replaced);
});
