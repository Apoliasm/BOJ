const fs = require("fs");
const path = "/dev/stdin";
const input = fs.readFileSync(path).toString().trim().split("\n");
const n = Number(input[0]);
const field = input.slice(1).map((row) => row.split(" ").map(Number));
const directions = {
  LEFT: {
    start: 0,
    dir: 1,
  },
  RIGHT: {
    start: n - 1,
    dir: -1,
  },
  UP: {
    start: 0,
    dir: 1,
  },
  DOWN: {
    start: n - 1,
    dir: -1,
  },
};

let trials = 0;
let queue = [];
let head = 0;
let answer = 0;

simulation(0, field);
console.log(answer);
function simulation(trials, curField) {
  if (trials === 5) {
    answer = Math.max(answer, getMax(curField));
    return;
  }
  for (const dir of Object.keys(directions)) {
    let field = curField.map((row) => [...row]);
    move(dir, field);
    simulation(trials + 1, field);
  }
}

function move(direction, field) {
  let { start, dir } = directions[direction];
  clearQ();
  let result = [];
  if (direction === "UP" || direction == "DOWN") {
    for (let col = 0; col < n; col++) {
      result = merge(
        field.map((row) => row[col]),
        direction
      );
      if (direction === "DOWN") result = result.reverse();
      for (let row = 0; row < n; row++) field[row][col] = result[row];
    }
  } else {
    for (let row = 0; row < n; row++) {
      result = merge(field[row], direction);
      if (direction === "RIGHT") result = result.reverse();
      for (let col = 0; col < n; col++) field[row][col] = result[col];
    }
  }
}

function merge(chunks, direction) {
  clearQ();
  let { start, dir } = directions[direction];
  for (let cur = start; cur < n && cur >= 0; cur += dir) {
    if (chunks[cur] === 0) continue;
    pushQ(chunks[cur]);
  }
  let results = Array(n).fill(0);
  let length = getLength();
  let cur = 0;
  let ri = 0;
  for (let i = 0; i < length; i++) {
    if (cur === 0) {
      cur = popQ();
      continue;
    } else {
      if (getFront() === cur) {
        popQ();
        results[ri++] = cur * 2;
        cur = 0;
      } else {
        results[ri++] = cur;
        cur = popQ();
      }
    }
  }
  if (cur !== 0) results[ri++] = cur;
  return results;
}

function clearQ() {
  queue = [];
  head = 0;
}

function pushQ(item) {
  queue.push(item);
}
function popQ() {
  if (getLength() === 0) return null;
  return queue[head++];
}
function getLength() {
  return queue.length - head;
}
function getFront() {
  if (getLength() === 0) return null;
  return queue[head];
}
function getMax(field) {
  let max = 0;
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      if (max < field[row][col]) {
        max = field[row][col];
      }
    }
  }
  return max;
}

/**
 * 1. 전체 블록을 네 방향 중 하나로 이동
 * 2. 같은 값이 충돌하면 합쳐짐.
 * 3. 큐로 만들고, 앞/뒤부터 뿌리기
 * 5번 시뮬레이션
 * 필요한 행동
 * 1. 방향대로 이동
 * 2. 합치기
 * 3. 다시 넣기
 *
 *
 *
 */
