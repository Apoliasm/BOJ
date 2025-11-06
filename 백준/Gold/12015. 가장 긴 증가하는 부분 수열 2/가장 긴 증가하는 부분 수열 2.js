const fs = require("fs");
const path = "/dev/stdin";
const [[n], input] = fs
  .readFileSync(path)
  .toString()
  .trim()
  .split("\n")
  .map((it) => it.split(" ").map(Number));

const lis = [];
lis.push(input[0]);
for (let i = 1; i < n; i++) {
  if (lis.at(-1) < input[i]) {
    lis.push(input[i]);
  } else {
    binaryExplore(input[i]);
  }
}

console.log(lis.length);
function binaryExplore(value) {
  let [left, right] = [0, lis.length - 1];

  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    if (lis[mid] < value) left = mid + 1;
    else right = mid;
  }
  lis[left] = value;
}

/**
 * 브루트포스를 한다면
 * 앞에 갔다가 길어지는거 체크
 * 그리고 다음
 * 또 앞에거 세면서
 * 굉장히 많은 중복 계산 최적화 필요
 *
 * 현재 수열에서 이어지는가 아닌가만 판단
 * 안이어지면 또는 대체 가능하면 그대로
 * 대체 가능한 것을 어떻게 아는지?
 * 이어지면 + 1
 * 이어지는거면 수열 맨 끝 값과 비교
 * 결국 맨 끝값과만 비교한다.
 *
 *
 */
