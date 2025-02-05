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
  let field = [[...input[0]], [...input[1]], [...input[2]]];
  let cost = 10;
  for (let i = 0; i < 3; i++) {
    cost = compareMin(
      cost,
      detechHowmuch([field[i][0], field[i][1], field[i][2]])
    );
    cost = compareMin(
      cost,
      detechHowmuch([field[0][i], field[1][i], field[2][i]])
    );
  }
  console.log(cost);
});

function detechHowmuch(arr) {
  const set = new Set(arr);
  if (set.size === 1) {
    return 0;
  } else if (set.size === 2) {
    let onlyOnce = 0;
    let twice = 0;
    arr.forEach((outerElement) => {
      let numOf = 0;
      arr.forEach((innerElement) => {
        if (innerElement === outerElement) {
          numOf += 1;
        }
      });
      if (numOf === 1) {
        onlyOnce = outerElement;
      } else {
        twice = outerElement;
      }
    });
    return onlyOnce > twice ? onlyOnce - twice : twice - onlyOnce;
  } else {
    // 1 2 3 모두 나타날 때 2로 맞추면 됨
    return 2;
  }
}

function compareMin(a, b) {
  return a < b ? a : b;
}
