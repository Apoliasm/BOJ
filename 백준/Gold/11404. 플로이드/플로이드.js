const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let lineCount = 0,
  n = 0,
  m = 0;
let mCount = 0;
let adjList = [];
let floydArr = [];

readline
  .on("line", (line) => {
    if (lineCount === 0) {
      n = Number(line.trim());
      lineCount += 1;
    } else if (lineCount === 1) {
      m = Number(line.trim());
      lineCount += 1;

      floydArr = Array.from({ length: n + 1 }, () => {
        return Array(n + 1).fill(Number.MAX_SAFE_INTEGER);
      });
    } else {
      let [src, dest, cost] = line
        .trim()
        .split(" ")
        .map((val) => Number(val));
      floydArr[src][dest] = Math.min(floydArr[src][dest], cost);

      mCount += 1;
      if (mCount === m) {
        readline.close();
      }
    }
  })
  .on("close", () => {
    for (let i = 1; i <= n; i++) {
      floydArr[i][i] = 0;
    }
    for (let through = 1; through <= n; through++) {
      for (let src = 1; src <= n; src++) {
        for (let dest = 1; dest <= n; dest++) {
          if (src !== dest) {
            floydArr[src][dest] = Math.min(
              floydArr[src][dest],
              floydArr[src][through] + floydArr[through][dest]
            );
          }
        }
      }
    }

    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= n; j++) {
        if (floydArr[i][j] === Number.MAX_SAFE_INTEGER) {
          floydArr[i][j] = 0;
        }
      }
      console.log(floydArr[i].slice(1).join(" "));
    }
  });
