const { format } = require("path");

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let lineCount = 0;
let n = 0;
let seq = [];

readline
  .on("line", (line) => {
    if (lineCount === 0) {
      n = Number(line.trim());
      lineCount += 1;
    } else {
      seq = line
        .trim()
        .split(" ")
        .map((value) => Number(value));
      readline.close();
    }
  })
  .on("close", () => {
    const increaseDP = new Array(n).fill(1);
    const decreaseDP = new Array(n).fill(1);

    // 증가 DP 구하기
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < i; j++) {
        if (seq[i] > seq[j]) {
          increaseDP[i] = Math.max(increaseDP[i], increaseDP[j] + 1);
        }
      }
    }

    // 감소 DP 구하기
    for (let i = n - 1; i >= 0; i--) {
      for (let j = i + 1; j < n; j++) {
        if (seq[i] > seq[j]) {
          decreaseDP[i] = Math.max(decreaseDP[i], decreaseDP[j] + 1);
        }
      }
    }

    // 최종 결과 계산
    let maxLength = 0;
    for (let i = 0; i < n; i++) {
      maxLength = Math.max(maxLength, increaseDP[i] + decreaseDP[i] - 1);
    }

    console.log(maxLength);
  });
/**
 * 그리디하게 하나씩 가면서 가장 긴 수열을 갱신한다.
 * 하나 붙였을 때
 * 1 -> 1
 * 1 5 -> 2
 * 1 5 2 -> 3
 * 1 5 2 1 -> 4
 * 1 5 2 1 4 -> 4
 * 1 5 2 1 4 3 -> 4
 * 1 5 2 1 4 3 4 -> 4
 * 1 5 2 1 4 3 4 5 -> 5
 *
 * 1 5 2 1 4 3 4 5
 */
