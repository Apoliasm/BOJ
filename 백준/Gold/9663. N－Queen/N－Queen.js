const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let n = 0;

readline
  .on("line", (line) => {
    n = parseInt(line.trim());
    readline.close();
  })
  .on("close", () => {
    let initChess = Array.from({ length: n }, () => Array(n).fill(false));
    let cases = 0;
    for (let col = 0; col < n; col++) {
      dfs(initChess, 0, col);
    }
    console.log(cases);
    process.exit();

    function dfs(chess, currentRow, currentCol) {
      let currentChess = chess.map((row) => {
        return [...row];
      });
      let leftCol = currentCol;
      let rightCol = currentCol;

      currentChess[currentRow][currentCol] = true;
      for (let underRow = currentRow + 1; underRow < n; underRow++) {
        leftCol = leftCol - 1;
        rightCol = rightCol + 1;
        currentChess[underRow][currentCol] = true;
        if (leftCol >= 0) {
          currentChess[underRow][leftCol] = true;
        }
        if (rightCol < n) {
          currentChess[underRow][rightCol] = true;
        }
      }

      if (currentRow + 1 < n) {
        currentChess[currentRow + 1].forEach((each, nextCol) => {
          if (!each) {
            dfs(currentChess, currentRow + 1, nextCol);
          }
        });
      } else {
        cases += 1;
        return;
      }
    }
  });
/***
 *
 * 한 행에 반드시 하나 씩
 * 각 열애 대해 전수 조사 필요
 * dfs,
 * ㅇㅇㅇㅇㅇㅇㅇㅇ
 * ㅇㅇㅁㅁㅁㅁㅁㅁ
 * ㅇㅁㅇㅁㅁㅁㅁㅁ
 * ㅇㅁㅁㅇㅁㅁㅁㅁ
 * ㅇㅁㅁㅁㅇㅁㅁㅁ
 * ㅇㅁㅁㅁㅁㅇㅁㅁ
 * ㅇㅁㅁㅁㅁㅁㅇㅁ
 * ㅇㅁㅁㅁㅁㅁㅁㅇ
 *
 */
