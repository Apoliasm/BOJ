const fs = require("fs");
const path = "/dev/stdin";
const input = fs.readFileSync(path).toString().trim().split("\n");
const [n, m] = input[0].split(" ").map(Number);
const cameras = [];
const field = input.slice(1).map((row, rowIndex) =>
  row.split(" ").map((val, colIndex) => {
    if (val != 0 && val != 6) {
      cameras.push([rowIndex, colIndex, Number(val)]);
    }
    return Number(val);
  })
);
const directions = [
  { row: -1, col: 0 },
  { row: 1, col: 0 },
  { row: 0, col: -1 },
  { row: 0, col: 1 },
];

const cctvDirs = {
  1: [[0], [1], [2], [3]],
  2: [
    [0, 1],
    [2, 3],
  ],
  3: [
    [0, 3],
    [3, 1],
    [1, 2],
    [2, 0],
  ], // 상우, 우하, 하좌, 좌상
  4: [
    [2, 0, 3],
    [0, 3, 1],
    [3, 1, 2],
    [1, 2, 0],
  ], // 세 방향
  5: [[0, 1, 2, 3]],
};

for (let i = 0; i < 4; i++) {}

let answer = Infinity;
simulate(
  0,
  field.map((row) => [...row])
);
console.log(answer);
function simulate(camIndex, field) {
  if (camIndex === cameras.length) {
    let blind = 0;
    for (const row of field) {
      for (const val of row) {
        if (val === 0) blind++;
      }
    }
    answer = Math.min(answer, blind);
    return;
  }

  const [row, col, type] = cameras[camIndex];

  for (const dirs of cctvDirs[type]) {
    const copied = field.map((r) => [...r]);

    for (const d of dirs) {
      let [dr, dc] = [directions[d].row, directions[d].col];
      let [nr, nc] = [row + dr, col + dc];

      while (nr >= 0 && nr < n && nc >= 0 && nc < m) {
        if (copied[nr][nc] === 6) break; // 벽이면 멈춤
        if (copied[nr][nc] === 0) copied[nr][nc] = 7; // 감시 구역 표시
        // 다른 CCTV(1~5)는 그냥 통과해도 됨
        nr += dr;
        nc += dc;
      }
    }

    simulate(camIndex + 1, copied);
  }
}

/**
 *
 * k개의 티비
 * 5종류의 티비
 * 티비 종류 : 방향
 *
 * 시야 벽 통과 x
 * 회전 90도
 *
 * 1. 모든 경우 회전
 * 2. 볼 수 있는 체크
 *
 * 티비 종류 : 4방향, 2방향, 1방향
 * 사각지대의 최소 크기
 */
