const fs = require("fs");
const path = "/dev/stdin";
const input = fs.readFileSync(path).toString().trim().split("\n");
let winds = [[]];
winds.push(...input.slice(0, 4).map((line) => line.split("").map(Number)));
const k = Number(input[4]);
const rotates = input.slice(5).map((line) => line.split(" ").map(Number));

for (const [wind, dir] of rotates) {
  let [current, left, right] = [wind, wind - 1, wind + 1];
  let rotateOrNot = Array(5).fill(false);
  let dirs = Array(5).fill(dir);
  rotateOrNot[wind] = true;

  while (right <= 4) {
    if (winds[current][2] === winds[right][6]) {
      break;
    }
    if (dirs[current] === 1) {
      dirs[right] = -1;
    } else {
      dirs[right] = 1;
    }
    rotateOrNot[right] = true;
    current = right;
    right += 1;
  }
  current = wind;
  while (left > 0) {
    if (winds[current][6] === winds[left][2]) {
      break;
    }
    if (dirs[current] === 1) {
      dirs[left] = -1;
    } else {
      dirs[left] = 1;
    }
    rotateOrNot[left] = true;
    current = left;
    left -= 1;
  }
  current = wind;
  for (let i = 1; i <= 4; i++) {
    if (rotateOrNot[i]) rotating(i, dirs[i]);
  }
}
let score = 0;
for (let i = 1; i <= 4; i++) {
  if (winds[i][0] === 1) {
    score += Math.pow(2, i - 1);
  }
}
console.log(score);

function rotating(wind, dir) {
  if (dir === 1) {
    winds[wind] = [winds[wind][7], ...winds[wind].slice(0, 7)];
  } else {
    winds[wind] = [...winds[wind].slice(1), winds[wind][0]];
  }
}

/**
 * 자기 자신 회전 결정
 * 양옆 확인
 * 회전한다면 그 옆을 또 체크
 * 그게 아니라면 회전하지도 않음
 */
