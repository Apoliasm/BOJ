// 1967 트리의 지름
const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");
const n = Number(input[0]);

// 인접 리스트 (양방향으로 만들어야 함)
const adj = Array.from({ length: n + 1 }, () => []);
for (let i = 1; i < input.length; i++) {
  const [a, b, w] = input[i].split(" ").map(Number);
  adj[a].push([b, w]);
  adj[b].push([a, w]);
}

// 한 번의 BFS로 (start)에서 가장 먼 노드와 거리 구하기
function bfs(start) {
  const dist = Array(n + 1).fill(-1);
  const q = new Array(n);
  let head = 0, tail = 0;

  dist[start] = 0;
  q[tail++] = start;

  let farNode = start, farDist = 0;

  while (head < tail) {
    const cur = q[head++];
    const d = dist[cur];
    if (d > farDist) {
      farDist = d;
      farNode = cur;
    }
    for (const [nx, w] of adj[cur]) {
      if (dist[nx] === -1) {
        dist[nx] = d + w;
        q[tail++] = nx;
      }
    }
  }
  return { node: farNode, dist: farDist };
}

// 임의의 노드(1)에서 가장 먼 A 찾고, A에서 다시 BFS하여 지름 길이
const A = bfs(1).node;
const diameter = bfs(A).dist;
console.log(diameter);
