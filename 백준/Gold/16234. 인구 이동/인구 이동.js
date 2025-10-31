const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
let n = 0,
  l = 0,
  r = 0;
lineCount = 0;
nCount = 0;
let field = [];
//상하좌우
let dirRow = [-1, 1, 0, 0];
let dirCol = [0, 0, -1, 1];
readline
  .on("line", (line) => {
    if (lineCount === 0) {
      [n, l, r] = line
        .trim()
        .split(" ")
        .map((val) => Number(val));
      field = Array.from({ length: n }, (_) => []);
      lineCount += 1;
    } else {
      field[nCount++] = line
        .trim()
        .split(" ")
        .map((val) => Number(val));
      if (nCount === n) readline.close();
    }
  })
  .on("close", () => {
    let rootMap = [];
    days = 0;
    while (true) {
      rootMap = Array.from({ length: n }, (_) => Array(n).fill(-1));
      let currentRoot = 0;
      let nationsArr = [];
      let populationsArr = [];

      for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
          if (rootMap[r][c] === -1) {
            let nations = 1;
            let population = field[r][c];
            rootMap[r][c] = currentRoot;
            [nations, population] = dfs(currentRoot, r, c, nations, population);
            nationsArr.push(nations);
            populationsArr.push(population);
            currentRoot += 1;
          }
        }
      }

      if (currentRoot === n * n) break;
      for (let i = 0; i < currentRoot; i++) {
        populationsArr[i] = Math.floor(populationsArr[i] / nationsArr[i]);
      }
      for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
          let currentRoot = rootMap[r][c];
          field[r][c] = populationsArr[currentRoot];
        }
      }
      days += 1;
    }
    console.log(days);

    function isValidField(row, col) {
      if (row < 0 || col < 0 || row >= n || col >= n) return false;
      return true;
    }

    function isMovable(current, next) {
      let gap = Math.abs(current - next);
      if (gap >= l && gap <= r) return true;
      return false;
    }

    function dfs(root, r, c, nations, population) {
      for (let d = 0; d < 4; d++) {
        let [nextRow, nextCol] = [r + dirRow[d], c + dirCol[d]];
        if (!isValidField(nextRow, nextCol)) continue;
        if (rootMap[nextRow][nextCol] === root) continue;
        if (!isMovable(field[r][c], field[nextRow][nextCol])) continue;
        population += field[nextRow][nextCol];
        nations += 1;
        rootMap[nextRow][nextCol] = rootMap[r][c];
        [nations, population] = dfs(
          root,
          nextRow,
          nextCol,
          nations,
          population
        );
      }
      return [nations, population];
    }
  });

/**
 *
 * 모든 인접한 칸의 인구 이동 가능 여부를 파악
 * 단순 브루트포스 n*n*4
 * dfs해서 n*n으로만 끝내기 가능
 * union find로 집합 연산 필요한가?
 *
 * 1. dfs로 같은 집합은 묶기
 * 2. 이들 합을 갱신해서 나누기만 하면됨
 * 3. 될때까지 반복
 * 최대 2천번
 * 시간이 터질일은 없을 것
 *
 */
