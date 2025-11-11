const fs = require("fs");
const path = "/dev/stdin";
const input = fs.readFileSync(path).toString().trim().split("\n");
const [n, m] = input[0].split(" ").map(Number);

const red = { row: 0, col: 0 };
const blue = { row: 0, col: 0 };

const field = input.slice(1).map((row, rowIndex) =>
  row.split("").map((col, colIndex) => {
    if (col === "R") {
      [red.row, red.col] = [rowIndex, colIndex];
      return "."; // 편하게 .로 바꿔둠
    } else if (col === "B") {
      [blue.row, blue.col] = [rowIndex, colIndex];
      return ".";
    }
    return col;
  })
);

// 상하좌우
const dirRow = [-1, 1, 0, 0];
const dirCol = [0, 0, -1, 1];

// 4차원 visited
const visited = Array.from({ length: n }, () =>
  Array.from({ length: m }, () =>
    Array.from({ length: n }, () => Array(m).fill(false))
  )
);

let answer = Infinity;

visited[red.row][red.col][blue.row][blue.col] = true;
simulate(1, { ...red }, { ...blue });

console.log(answer === Infinity ? -1 : answer);

function simulate(trials, red, blue) {
  if (trials > 10) return;

  for (let dir = 0; dir < 4; dir++) {
    const [nextRed, nextBlue, rFallen, bFallen] = isMovable(red, blue, dir);

    // 파란 구슬 빠지면 실패
    if (bFallen) continue;

    // 파란 건 안 빠지고 빨간 것만 빠졌으면 성공
    if (rFallen) {
      answer = Math.min(answer, trials);
      return;
    }

    // 둘 다 안 움직였으면 의미 없음
    if (
      nextRed.row === red.row &&
      nextRed.col === red.col &&
      nextBlue.row === blue.row &&
      nextBlue.col === blue.col
    ) {
      continue;
    }

    if (!visited[nextRed.row][nextRed.col][nextBlue.row][nextBlue.col]) {
      visited[nextRed.row][nextRed.col][nextBlue.row][nextBlue.col] = true;
      simulate(trials + 1, nextRed, nextBlue);
      visited[nextRed.row][nextRed.col][nextBlue.row][nextBlue.col] = false;
    }
  }
}

function isMovable(red, blue, dir) {
  let { row: rR, col: rC } = red;
  let { row: bR, col: bC } = blue;
  const dR = dirRow[dir];
  const dC = dirCol[dir];
  let rFallen = false;
  let bFallen = false;

  // 빨강 먼저 굴림
  while (true) {
    const nr = rR + dR;
    const nc = rC + dC;
    if (field[nr][nc] === "#") break;
    rR = nr;
    rC = nc;
    if (field[rR][rC] === "O") {
      rFallen = true;
      break;
    }
  }

  // 파랑 굴림
  while (true) {
    const nr = bR + dR;
    const nc = bC + dC;
    if (field[nr][nc] === "#") break;
    bR = nr;
    bC = nc;
    if (field[bR][bC] === "O") {
      bFallen = true;
      break;
    }
  }

  // 둘 다 같은 칸에 멈췄고 그게 구멍이 아니면 밀어내기
  if (rR === bR && rC === bC && field[rR][rC] !== "O") {
    switch (dir) {
      case 0: // 위
        if (red.row < blue.row) {
          // 원래 빨강이 위
          bR += 1;
        } else {
          rR += 1;
        }
        break;
      case 1: // 아래
        if (red.row > blue.row) {
          bR -= 1;
        } else {
          rR -= 1;
        }
        break;
      case 2: // 왼
        if (red.col < blue.col) {
          bC += 1;
        } else {
          rC += 1;
        }
        break;
      case 3: // 오
        if (red.col > blue.col) {
          bC -= 1;
        } else {
          rC -= 1;
        }
        break;
    }
  }

  return [{ row: rR, col: rC }, { row: bR, col: bC }, rFallen, bFallen];
}
