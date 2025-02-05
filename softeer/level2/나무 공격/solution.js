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
  let destroyerMap = {};
  let total = 0;
  let [n, m] = input[0];
  for (let i = 1; i <= n; i++) {
    let eachRow = input[i];
    destroyerMap[i] = 0;
    eachRow.forEach((currentElement) => {
      if (currentElement === 1) {
        destroyerMap[i] += 1;
        total += 1;
      }
    });
  }
  let [firstStart, firstEnd] = input[n + 1];
  let [secondStart, secondEnd] = input[n + 2];
  Object.keys(destroyerMap).forEach((rowIndex) => {
    if (
      firstStart <= rowIndex &&
      rowIndex <= firstEnd &&
      destroyerMap[rowIndex] >= 1
    ) {
      total -= 1;
      destroyerMap[rowIndex] -= 1;
    }
  });
  Object.keys(destroyerMap).forEach((rowIndex) => {
    if (
      secondStart <= rowIndex &&
      rowIndex <= secondEnd &&
      destroyerMap[rowIndex] >= 1
    ) {
      total -= 1;
      destroyerMap[rowIndex] -= 1;
    }
  });

  console.log(total);
});
