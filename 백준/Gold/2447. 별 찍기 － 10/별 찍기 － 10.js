const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let n = 0;

readline
  .on("line", (line) => {
    n = Number(line);
    readline.close();
  })
  .on("close", () => {
    let result = Array.from({ length: n }, () => {
      return [];
    });
    let sqrts = {};
    for (let i = 0; i <= 8; i++) {
      sqrts[Math.pow(3, i)] = i;
    }
    for (let i = 1; i <= n; i++) {
      result[i] = [];
    }
    recursiveStar(n, 0);
    result.forEach((element) => {
      console.log(element.join(""));
    });

    function recursiveStar(n, startRow) {
      top(n, startRow + (n / 3) * 0);
      center(n, startRow + (n / 3) * 1);
      bottom(n, startRow + (n / 3) * 2);

      function top(n, startRow) {
        if (n === 3) {
          for (let i = 0; i < 3; i++) {
            result[startRow].push("*");
          }
        } else {
          for (let i = 0; i < 3; i++) {
            recursiveStar(n / 3, startRow);
          }
        }
      }

      function bottom(n, startRow) {
        if (n === 3) {
          for (let i = 0; i < 3; i++) {
            result[startRow].push("*");
          }
        } else {
          for (let i = 0; i < 3; i++) {
            recursiveStar(n / 3, startRow);
          }
        }
      }
      function center(n, startRow) {
        if (n === 3) {
          result[startRow].push("*");
          empty(n / 3, startRow);
          result[startRow].push("*");
        } else {
          recursiveStar(n / 3, startRow);
          empty(n / 3, startRow);
          recursiveStar(n / 3, startRow);
        }
      }
      function empty(n, startRow) {
        if (n === 1) {
          result[startRow].push(" ");
        } else {
          for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
              empty(n / 3, startRow + (n / 3) * j);
            }
          }
        }
      }
    }
  });
