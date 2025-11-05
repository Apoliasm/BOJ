const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
let n = 0,
  m = 0;
nCount = -1;
let field = [];
let answer = 0;
//상하좌우
let dirRow = [-1, 1, 0, 0];
let dirCol = [0, 0, -1, 1];

readline
  .on("line", (line) => {
    if (nCount === -1) {
      [n, m] = line
        .trim()
        .split(" ")
        .map((val) => Number(val));
      field = Array.from({ length: n }, (_) => []);
      nCount += 1;
    } else {
      field[nCount] = line
        .trim()
        .split(" ")
        .map((val) => Number(val));
      nCount += 1;
      if (nCount === n) readline.close();
    }
  })
  .on("close", () => {
    let dp = Array.from({ length: n }, (_) => Array(m).fill(-1));

    answer = dfs(0, 0, field[0][0]);

    console.log(answer);
    function dfs(row, col, height) {
      if (row === n - 1 && col === m - 1) return 1;

      if (dp[row][col] !== -1) return dp[row][col];

      dp[row][col] = 0;

      for (let dir = 0; dir < 4; dir++) {
        let [nextRow, nextCol] = [row + dirRow[dir], col + dirCol[dir]];
        if (!isMovable(nextRow, nextCol)) continue;

        if (field[nextRow][nextCol] < height) {
          dp[row][col] += dfs(nextRow, nextCol, field[nextRow][nextCol]);
        }
      }
      return dp[row][col];
    }

    function isMovable(nextRow, nextCol) {
      if (nextRow < 0 || nextCol < 0 || nextRow >= n || nextCol >= m)
        return false;
      return true;
    }
  });
