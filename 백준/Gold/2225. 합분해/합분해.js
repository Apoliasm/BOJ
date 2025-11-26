const fs = require("fs");
const path = "/dev/stdin";
const input = fs.readFileSync(path).toString().trim().split("\n");
const [n, k] = input[0].split(" ").map(Number);

const dp = Array.from({ length: k + 1 }, () => Array(n + 1).fill(0));
const modulo = 1_000_000_000;

//1개로 i를 만드는 경우는 반드시 한가지
for (let i = 0; i < n + 1; i++) {
  dp[1][i] = 1;
}

let trials = 1;
while (trials++ < k) {
  for (let i = 0; i <= n; i++) {
    for (let j = 0; j <= i; j++) {
      dp[trials][i] = (dp[trials - 1][i - j] + dp[trials][i]) % modulo;
    }
    dp[trials][i] = dp[trials][i] % modulo;
  }
}
console.log(dp[k][n] % modulo);

/**
 *
 * 1+2 + 3
 *
 * 모두 5가 되는 경우 (1+4, 2+3, 3+2, 4+1)
 * 1+4 -> 1가지 -> 4+1도 있지만... -> 이건 뒤에서 고려할것
 * 2+3 ->  2가 되는 경우의 수 -> 2 = 1+1,2 -> 본인 + 1이 되는 경우
 * 3+2 -> 3이 되는 = 3, 2+1, 1+2
 * 4+1 -> 4가 되는
 *
 * 결국 순서 바뀌는 모든 경우가 알아서 고려 됨
 *
 * 단 더하는 갯수가 k,더하는 갯수의 정보도 포함해야한다.
 * 구하는 답은 k-1개로 j를 만드는 경우를 다 더한 값.
 */
