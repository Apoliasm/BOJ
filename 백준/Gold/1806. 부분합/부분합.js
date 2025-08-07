const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let lineCount = 0,
  s = 0,
  n = 0;
let start = 0,
  end = 0,
  sum = 0;
let minLen = Infinity;
let input = [];
let answer = 0;
readline
  .on("line", (line) => {
    if (lineCount === 0) {
      [n, s] = line
        .trim()
        .split(" ")
        .map((num) => Number(num));
      lineCount += 1;
    } else {
      input = line
        .trim()
        .split(" ")
        .map((num) => Number(num));
      readline.close();
    }
  })
  .on("close", () => {
    while (end <= n) {
      if (sum >= s) {
        minLen = Math.min(minLen, end - start);
        sum -= input[start++];
      } else {
        sum += input[end++];
      }
    }

    console.log(minLen === Infinity ? 0 : minLen);
  });
