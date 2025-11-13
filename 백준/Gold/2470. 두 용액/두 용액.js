const fs = require("fs");
const path = "/dev/stdin";
const input = fs.readFileSync(path).toString().trim().split("\n");
const n = Number(input[0]);
const arr = input[1].split(" ").map(Number);
arr.sort((a, b) => a - b);
let minAbs = Infinity;
let [left, right] = [0, n - 1];
let [lresult, rresult] = [arr[left], arr[right]];
while (left < right) {
  let sum = arr[left] + arr[right];
  let abs = Math.abs(sum);
  if (abs < minAbs) {
    minAbs = abs;
    [lresult, rresult] = [arr[left], arr[right]];
  }
  if (sum === 0) break;
  else if (sum < 0) left += 1;
  else right -= 1;
}
console.log(`${lresult} ${rresult}`);
/**
 *
 * 정렬 후 투포인터 O(nlogn)
 * -99 -2 -1 4 98
 *  l          r
 * -1 0보다 작음 -> 작은수를 늘리면 더 커짐
 * 0보다 크면 큰수를 줄임 -> r 줄임
 */
