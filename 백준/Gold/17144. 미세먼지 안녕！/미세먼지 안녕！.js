const fs = require("fs");
const path = "/dev/stdin";
const input = fs.readFileSync(path).toString().trim().split("\n");
const [r, c, t] = input[0].split(" ").map(Number);
let curField = input.slice(1).map((row) => row.split(" ").map(Number));
let upperCleaner = curField.map((row) => row[0]).findIndex((val) => val === -1);
let downCleaener = upperCleaner + 1;
//상하좌우
const directions = {
  UP: [-1, 0],
  DOWN: [1, 0],
  LEFT: [0, -1],
  RIGHT: [0, 1],
};

simulate(0);

function simulate(sec) {
  if (sec === t) return;
  //1 먼지 확산
  curField = diffuse();
  clean();
  return simulate(sec + 1);
}

console.log(
  curField.reduce(
    (prev, row) => prev + row.reduce((rowp, val) => rowp + val, 0),
    0
  ) + 2
);

function clean() {
  let cleanerWise = {
    CCW: {
      DIR: ["RIGHT", "UP", "LEFT", "DOWN"],
      ROW: [upperCleaner, upperCleaner - 1, 0, 1],
      COL: [1, c - 1, c - 2, 0],
    },
    CW: {
      DIR: ["RIGHT", "DOWN", "LEFT", "UP"],
      ROW: [downCleaener, downCleaener + 1, r - 1, r - 2],
      COL: [1, c - 1, c - 2, 0],
    },
  };

  for (const wise in cleanerWise) {
    let rcQ = [];
    for (let d = 0; d < 4; d++) {
      let dir = cleanerWise[wise]["DIR"][d];
      let [sr, sc] = [cleanerWise[wise]["ROW"][d], cleanerWise[wise]["COL"][d]];
      let [dr, dc] = directions[dir];
      let [row, col] = [sr, sc];
      if (dir === "LEFT" || dir === "RIGHT") {
        for (
          col = sc;
          col >= 0 && col < c && curField[row][col] !== -1;
          col += dc
        ) {
          rcQ.push([row, col]);
        }
      } else {
        for (
          row = sr;
          row >= 0 && row < r && curField[row][col] !== -1;
          row += dr
        ) {
          rcQ.push([row, col]);
        }
      }
    }
    let [cr, cc] = rcQ.pop();
    while (rcQ.length !== 0) {
      let [nr, nc] = rcQ.pop();
      curField[cr][cc] = curField[nr][nc];
      [cr, cc] = [nr, nc];
    }
    curField[cr][cc] = 0;
  }
}

function diffuse() {
  let field = Array.from({ length: r }, () => Array(c).fill(0));
  field[upperCleaner][0] = -1;
  field[downCleaener][0] = -1;
  for (let curR = 0; curR < r; curR++) {
    for (let curC = 0; curC < c; curC++) {
      if (curField[curR][curC] === 0) continue;
      if (curField[curR][curC] === -1) continue;
      let spreadDust = Math.floor(curField[curR][curC] / 5);
      let spreadDirs = 0;
      for (const [dRow, dCol] of Object.values(directions)) {
        let [nextR, nextC] = [curR + dRow, curC + dCol];
        if (!isMovable(nextR, nextC)) continue;
        if (curField[nextR][nextC] === -1) continue;
        spreadDirs += 1;
        field[nextR][nextC] += spreadDust;
      }
      field[curR][curC] += curField[curR][curC] - spreadDust * spreadDirs;
    }
  }
  return field;
}

function isMovable(row, col) {
  if (row < 0 || row >= r || col < 0 || col >= c) return false;
  return true;
}

/**
 * 1. 미세먼지 인접 네 방향 확산
 * 2. 인접한 방향에 공기청정기가 있으면, 못가는 칸이면 확산 x
 * 3. field[][]/5
 * 4. 공기청정기 작동 -> 위 반시계, 아래 시계방향
 * 5. 방향대로 한칸씩 이동
 * 6. 공기청정기로 들어가면 사라짐
 */
