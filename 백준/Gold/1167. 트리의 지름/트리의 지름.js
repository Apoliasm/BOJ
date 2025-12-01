const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");

const V = Number(input[0]);

// 인접 리스트: graph[v] = [{ to, dist }, ...]
const graph = Array.from({ length: V + 1 }, () => []);

for (let i = 1; i <= V; i++) {
  const line = input[i].trim().split(" ").map(Number);
  const from = line[0];

  let idx = 1;
  while (true) {
    const to = line[idx++];
    if (to === -1 || isNaN(to)) break;
    const dist = line[idx++];
    graph[from].push({ to, dist });
  }
}

// BFS 함수: start에서부터 가장 먼 정점과 그 거리 반환
function bfs(start) {
  const visited = Array(V + 1).fill(false);
  const dist = Array(V + 1).fill(0);

  const queue = [];
  let head = 0;

  queue.push(start);
  visited[start] = true;

  while (head < queue.length) {
    const cur = queue[head++];

    for (const { to, dist: w } of graph[cur]) {
      if (!visited[to]) {
        visited[to] = true;
        dist[to] = dist[cur] + w;
        queue.push(to);
      }
    }
  }

  // 가장 먼 정점과 그 거리 찾기
  let maxNode = start;
  let maxDist = 0;
  for (let i = 1; i <= V; i++) {
    if (dist[i] > maxDist) {
      maxDist = dist[i];
      maxNode = i;
    }
  }
  return { maxNode, maxDist };
}

// 1. 임의의 정점(1번)에서 가장 먼 정점을 찾음 → A
const { maxNode: A } = bfs(1);

// 2. A에서 다시 BFS → 가장 먼 거리 = 트리의 지름
const { maxDist: diameter } = bfs(A);

console.log(diameter);
