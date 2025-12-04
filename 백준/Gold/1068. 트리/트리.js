const fs = require("fs");
const path = "/dev/stdin";
const input = fs.readFileSync(path).toString().trim().split("\n");
const n = Number(input[0]);
const parents = input[1].split(" ").map(Number);
const target = Number(input[2]);
const graph = Array.from({ length: n }, () => []);
let root = -1;
let leaves = 0;
parents.forEach((parent, index) => {
  if (parent === -1) root = index;
  else graph[parent].push(index);
});
const visited = Array(n).fill(false);
let allLeaves = dfsGetLeaves(root);
visited.forEach((val, i) => (visited[i] = false));
let current = target;
while (current !== -1) {
  visited[current] = true;
  current = parents[current];
}
let targetLeaves = dfsGetLeaves(target);
if (parents[target] !== -1 && graph[parents[target]].length === 1) {
  console.log(allLeaves - targetLeaves + 1);
} else {
  console.log(allLeaves - targetLeaves);
}
// console.log(targetLeaves);
function dfsGetLeaves(node) {
  let leaves = 0;
  visited[node] = true;
  if (graph[node].length === 0) leaves += 1;
  for (let next of graph[node]) {
    if (visited[next]) continue;
    leaves += dfsGetLeaves(next);
  }
  return leaves;
}
/**
 *
 * 그래프 만들고, 자식 노드로 push
 * 노드 지우면 자식노드 모두 지우기
 * 부모가 current인걸 다 지우면 된다.
 * 이걸 일일이 순회 -> 불가능
 * 시작 node에서 bfs -> 전체 다 지우기
 * 그다음 자식 세기? -> bfs해서 리프노드 수만 빼면 된다.
 * 1. dfs로 리프노드 세기
 * 2. bfs로 타겟 하위노드 세기
 * 3. 그대로 빼고 + 1
 * ㄴ 자식이 딱 하나일때는 그 노드를 빼면서 그 부모가 leaf가되는 경우
 */
