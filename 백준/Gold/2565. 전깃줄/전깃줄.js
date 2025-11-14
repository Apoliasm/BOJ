const fs = require("fs");
const path = "/dev/stdin";
const input = fs.readFileSync(path).toString().trim().split("\n");

const n = Number(input[0]);
const arr = Array.from({ length: n + 1 }, (_, i) => []);
const lines = input.slice(1).map((line, index) => {
  return line.split(" ").map(Number);
});
lines.sort((a, b) => a[0] - b[0]);

let dp = Array(n).fill(1);
let lis = 0;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < i; j++) {
    if (lines[i][1] > lines[j][1]) {
      dp[i] = Math.max(dp[i], dp[j] + 1);
    }
  }
  lis = Math.max(lis, dp[i]);
}

console.log(n - lis);
/**
 * 1. 전깃줄
 * left right 인덱스
 *
 * 2. 교차상태
 * left - right가 전깃줄 순서대로 이어져 가야하는 상태
 *
 * 3. 최소 갯수?
 * 뭔가를 제거해야하는데, 이걸 어떻게 정하냐
 *
 * 4. 두 선의 관계
 * 100*99 로 모든 선의 관계를 규명할 순 있음
 * 관계1) 아무 영향 없음
 * 관계2) 겹침
 *
 * 5. 하나를 제거해야한다면
 * 가장 많이 겹치는 선에서 찾기?
 * 아무 영향을 주지 않는 선은 건들 필요가 없다.
 *
 * 큐를 만들어 하나씩 쌓기, left-right 보다 크면 push, 가장 긴 큐를 찾기?
 * 이 큐에 들어간게 아니면, 모두 겹치는 선들이다.
 *
 */
