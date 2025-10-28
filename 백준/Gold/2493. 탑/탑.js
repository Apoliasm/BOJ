const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
let n = 0,
  lineCount = 0,
  input = [],
  answer = [];
readline
  .on("line", (line) => {
    if (lineCount === 0) {
      n = Number(line.trim());
      answer = Array(n).fill(0);
      lineCount += 1;
    } else {
      input = line
        .trim()
        .split(" ")
        .map((val) => Number(val));
      readline.close();
    }
  })
  .on("close", () => {
    let stack = [];
    for (let i = 0; i < n; i++) {
      let current = input[i];
      while (stack.length > 0) {
        let front = stack[stack.length - 1];
        if (current > front.value) {
          stack.pop();
        } else {
          answer[i] = front.index;
          break;
        }
      }
      stack.push({ index: i + 1, value: current });
    }

    console.log(answer.join(" "));
  });

/**
 * 6 9 5 7 4
 * [9 7]
 */
