const fs = require("fs");
const path = "/dev/stdin";
const input = fs.readFileSync(path).toString().trim().split("\n");
const [n, m] = input.slice(0, 2).map(Number);
const edges = input.slice(2).map((line) => line.split(" ").map(Number));
edges.sort((a, b) => a[2] - b[2]);
const parents = Array.from({ length: n + 1 }, (_, i) => i);
const ranks = Array(n + 1).fill(0);
let answer = 0;
let linked = 0;
for (let [src, dest, cost] of edges) {
  if (find(src) === find(dest)) continue;
  if (linked === n - 1) break;
  union(src, dest);
  answer += cost;
}
console.log(answer);

function union(src, dest) {
  let firstParents = parents[src];
  let secondParents = parents[dest];
  if (firstParents === secondParents) return;
  //높은곳에 낮은걸 붙인다.
  if (ranks[firstParents] === ranks[secondParents]) {
    parents[secondParents] = firstParents;
    ranks[firstParents] += 1;
  } else {
    let [higher, smaller] = [firstParents, secondParents];
    if (ranks[firstParents] < ranks[secondParents])
      [smaller, higher] = [higher, smaller];
    parents[smaller] = higher;
  }
}

function find(node) {
  let root = node;
  //1. root 찾기
  while (root != parents[root]) {
    root = parents[root];
  }

  //2. 경로압축 - 그 사이의 모든 node의 parent도 root로 만듦
  while (node != parents[node]) {
    const curParent = parents[node];
    parents[node] = root;
    node = curParent;
  }

  return root;
}
1 - 2 - 3 - 4 - 5;
/**
 *
 * 연결되어있음 -> 가는 경로가 존재한다.
 * 연결 비용 최소
 * 모든 연결 최소
 * 최소신장트리
 *
 * 23
 * 45
 * 13 -> 123
 * 12
 *
 */
