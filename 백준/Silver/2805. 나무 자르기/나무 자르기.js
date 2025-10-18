const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
let trees = [];

let m = 0,
  n = 0,
  lineCount = 0;
readline
  .on("line", (line) => {
    if (lineCount === 0) {
      [n, m] = line
        .trim()
        .split(" ")
        .map((val) => Number(val));
      lineCount += 1;
    } else {
      trees = line
        .trim()
        .split(" ")
        .map((val) => Number(val));
      readline.close();
    }
  })
  .on("close", () => {
    //[f,f,f,f,f,f,....,T,T,T]
    let [start, end] = [1, Math.max(...trees) + 1];
    while (start <= end) {
      let mid = Math.floor((start + end) / 2);
      let remain = 0;
      for (let tree of trees) {
        if (tree - mid > 0) {
          remain += tree - mid;
        }
      }
      //적어도 m 미터필요
      //m 보다 나온게 적다면 -> 더 낮게 자르기 -> end 줄이기
      //m보다 나온게 많다면 -> 좀 높게 잘라도 됨 -> start 늘리기
      if (m > remain) end = mid - 1;
      else start = mid + 1;
    }

    console.log(end);
  });
