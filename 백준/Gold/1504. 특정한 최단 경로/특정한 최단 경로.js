const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
let n = 0,
  e = 0,
  eCount = 0,
  v1 = 0,
  v2 = 0,
  lineCount = 0;
let dist = [];
readline
  .on("line", (line) => {
    if (lineCount === 0) {
      [n, e] = line
        .trim()
        .split(" ")
        .map((val) => Number(val));
      lineCount += 1;
      graph = Array.from({ length: n + 1 }, (_) => []);
      dist = Array.from({ length: n + 1 }, (_) => Array(n + 1).fill(Infinity));
      for (let i = 1; i <= n; i++) dist[i][i] = 0;
    } else if (lineCount === 1 && eCount < e) {
      let [src, dest, weight] = line
        .trim()
        .split(" ")
        .map((val) => Number(val));

      dist[src][dest] = weight;
      dist[dest][src] = weight;
      eCount += 1;
      if (eCount === e) lineCount += 1;
    } else {
      [v1, v2] = line
        .trim()
        .split(" ")
        .map((val) => Number(val));
      readline.close();
    }
  })
  .on("close", () => {
    for (let through = 1; through <= n; through++) {
      for (let src = 1; src <= n; src++) {
        for (let dest = 1; dest <= n; dest++) {
          dist[src][dest] = Math.min(
            dist[src][through] + dist[through][dest],
            dist[src][dest]
          );
        }
      }
    }

    let answer = Math.min(
      dist[1][v1] + dist[v1][v2] + dist[v2][n],
      dist[1][v2] + dist[v2][v1] + dist[v1][n]
    );
    if (answer === Infinity) {
      console.log(-1);
    } else {
      console.log(answer);
    }
  });
