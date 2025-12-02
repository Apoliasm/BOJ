const fs = require("fs");
const path = "/dev/stdin";
const input = fs.readFileSync(path).toString().trim().split("\n");
const n = Number(input[0]);
let arr = Array(n + 1)
  .fill(true)
  .fill(false, 0, 2);
for (let i = 2; i <= Math.sqrt(n); i++) {
  if (arr[i]) {
    for (let j = i * i; j <= n; j += i) {
      arr[j] = false;
    }
  }
}
let primes = [];
for (let i = 2; i <= n; i++) {
  if (arr[i]) primes.push(i);
}
let answers = 0;
let [left, right] = [primes.length - 1, primes.length - 1];
let maxi = 0;
while (left <= right) {
  let sum = 0;
  if (left < 0 || right < 0 || left >= primes.length || right >= primes.length)
    break;
  for (let i = left; i <= right; i++) sum += primes[i];
  //작으면 윈도우 왼쪽으로 늘리기
  if (sum < n) {
    left -= 1;
  }
  //같으면 갱신, 윈도우 늘리기(같은 크기의 window로 더 나오지 않음)
  else if (sum === n) {
    // console.log(`${left} ${right}`);
    answers += 1;
    left -= 1;
  }
  //더 크면 윈도우 왼쪽으로 옮겨보기
  else {
    left -= 1;
    right -= 1;
  }
}
console.log(answers);

/**
 *
 * 소수 값은 정해져있다.
 * 하나 이상으로 특정 값.
 * 연속 -> 투포인터로 범위 정하기
 * 가장 가까운 수 부터 하나씩 늘리기
 *
 * n이 4백만 -> 메모리 터질 우려
 * 소수만 배열에 저장하기
 * 소수가 아닌 수는 a*b = c
 * 소수는 그럼 뭐냐
 *
 * f(17) -> f(13) + 17
 * f(16) = f(13)
 * 16 -> 2 return
 * 15 -> 3 return
 * 14 -> 2 return
 * 13 ->  12 11
 * 1 2 3 5 7 11 13 17
 */
