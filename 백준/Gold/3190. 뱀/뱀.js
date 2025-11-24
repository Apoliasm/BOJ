const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const N = Number(input[0]);
const K = Number(input[1]);

const board = Array.from({ length: N }, () => Array(N).fill(0));

let idx = 2;

// 사과 저장
for (let i = 0; i < K; i++) {
  const [r, c] = input[idx++].split(" ").map(Number);
  board[r - 1][c - 1] = 1;
}

// 방향 전환 정보
const L = Number(input[idx++]);
let turns = {};
for (let i = 0; i < L; i++) {
  const [x, c] = input[idx++].split(" ");
  turns[x] = c;
}

// 방향: 오른쪽, 아래, 왼쪽, 위
const dr = [0, 1, 0, -1];
const dc = [1, 0, -1, 0];

let snake = [[0, 0]]; // 덱처럼 사용 (맨 앞이 머리)
board[0][0] = 2; // 뱀 표시

let dir = 0; // 처음엔 오른쪽
let time = 0;

while (true) {
  time++;

  // 머리 이동
  let [hr, hc] = snake[0];
  let nr = hr + dr[dir];
  let nc = hc + dc[dir];

  // 충돌 체크 (벽, 몸)
  if (nr < 0 || nr >= N || nc < 0 || nc >= N || board[nr][nc] === 2) {
    break;
  }

  // 머리를 이동
  snake.unshift([nr, nc]);

  if (board[nr][nc] === 1) {
    // 사과 있으면 꼬리 유지
    board[nr][nc] = 2;
  } else {
    // 사과 없으면 꼬리 제거
    const [tr, tc] = snake.pop();
    board[tr][tc] = 0;
    board[nr][nc] = 2;
  }

  // 방향 전환
  if (turns[time]) {
    if (turns[time] === "L") dir = (dir + 3) % 4;
    else dir = (dir + 1) % 4;
  }
}

console.log(time);
