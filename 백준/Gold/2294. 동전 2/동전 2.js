const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
let n = 0,
  k = 0;
(lineCount = 0), (nCount = 0);
let coins = [];
let dp = [];
readline
  .on("line", (line) => {
    if (lineCount === 0) {
      [n, k] = line
        .trim()
        .split(" ")
        .map((val) => Number(val));
      lineCount += 1;
      dp = Array(k + 1).fill(0);
    } else {
      let input = Number(line.trim());
      dp[input] = 1;
      coins.push(input);
      nCount += 1;
      if (nCount === n) readline.close();
    }
  })
  .on("close", () => {
    for (let current = 1; current <= k; current++) {
      for (const coin of coins) {
        if (current - coin < 1) continue;
        if (dp[current - coin] === 0) continue;
        if (dp[current] === 0) {
          dp[current] = dp[current - coin] + 1;
        } else {
          dp[current] = Math.min(dp[current], dp[current - coin] + 1);
        }
      }
    }
    if (dp[k] === 0) {
      console.log(-1);
    } else {
      console.log(dp[k]);
    }
  });

