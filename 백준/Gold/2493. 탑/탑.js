const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");
const n = Number(input[0]);
const heights = input[1].trim().split(" ").map(Number);

const stack = []; // {height, index}
const answer = Array(n).fill(0);

for (let i = 0; i < n; i++) {
  const curHeight = heights[i];

  // 현재 탑보다 낮은 탑들은 앞으로도 쓸모없음
  while (stack.length > 0 && stack[stack.length - 1].height < curHeight) {
    stack.pop();
  }

  // 이제 스택 top이 나보다 크거나 같다면 그게 수신탑
  if (stack.length > 0) {
    answer[i] = stack[stack.length - 1].index + 1; // 문제는 1-based 인덱스 요구
  } else {
    answer[i] = 0;
  }

  // 현재 탑을 후보로 push
  stack.push({ height: curHeight, index: i });
}

console.log(answer.join(" "));
