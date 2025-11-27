const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");

const s1 = input[0].trim();
const s2 = input[1].trim();

const n = s1.length;
const m = s2.length;

// dp[i][j] = s1[0..i-1], s2[0..j-1]까지의 LCS 길이
const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

// DP 테이블 채우기
for (let i = 1; i <= n; i++) {
  for (let j = 1; j <= m; j++) {
    if (s1[i - 1] === s2[j - 1]) {
      dp[i][j] = dp[i - 1][j - 1] + 1;
    } else {
      dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
}

// LCS 길이
const lcsLen = dp[n][m];
if (lcsLen === 0) {
  console.log(0);
  process.exit(0);
}

// 역추적으로 실제 LCS 문자열 구하기
let i = n;
let j = m;
const lcsChars = [];

while (i > 0 && j > 0) {
  if (s1[i - 1] === s2[j - 1]) {
    // 공통 문자면 LCS에 포함
    lcsChars.push(s1[i - 1]);
    i--;
    j--;
  } else {
    // 더 큰 dp값을 가진 방향으로 이동
    if (dp[i - 1][j] >= dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }
}

// 뒤에서부터 채웠으니 뒤집어서 정순으로
lcsChars.reverse();
const lcsString = lcsChars.join("");

// 출력
console.log(lcsLen);
console.log(lcsString);
