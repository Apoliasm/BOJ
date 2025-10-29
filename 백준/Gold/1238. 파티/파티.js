const fs = require("fs");
const input = fs.readFileSync(0, "utf-8").trim().split("\n");

let lineIdx = 0;
let [n, m, x] = input[lineIdx++].trim().split(" ").map(Number);

// 그래프 초기화 (1-indexed)
const graph = Array.from({ length: n + 1 }, () => []);
const reverseGraph = Array.from({ length: n + 1 }, () => []);

// 간선 정보 입력
for (let i = 0; i < m; i++) {
  const [src, dest, weight] = input[lineIdx++].trim().split(" ").map(Number);
  graph[src].push({ dest, weight });
  reverseGraph[dest].push({ dest: src, weight }); // 역방향 간선 저장
}

/**
 * 최소 힙 (우선순위 큐)
 * 요소 형태: { node, cost } 또는 { dest, weight } (우린 dest/weight 쓸 거야)
 * compare(a, b) 가 true면 a가 b보다 "우선순위가 높다"(= 위로 올라가야 한다)는 의미
 * -> 여기서는 비용(cost/weight)가 더 작은 게 우선
 */
class MinHeap {
  constructor(compare) {
    this.array = [null]; // 1번 인덱스부터 사용
    this.compare = compare;
  }

  get length() {
    return this.array.length - 1;
  }

  push(item) {
    this.array.push(item);
    this.heapUp();
  }

  pop() {
    if (this.length === 0) return undefined;

    const top = this.array[1];
    const last = this.array[this.length];
    this.array.pop();

    if (this.length > 0) {
      this.array[1] = last;
      this.heapDown();
    }

    return top;
  }

  heapUp() {
    let idx = this.length;
    while (idx > 1) {
      const parent = Math.floor(idx / 2);
      if (!this.compare(this.array[idx], this.array[parent])) break;
      this.swap(idx, parent);
      idx = parent;
    }
  }

  heapDown() {
    let idx = 1;
    const size = this.length;

    while (true) {
      let left = idx * 2;
      let right = idx * 2 + 1;
      let next = idx;

      if (
        left <= size &&
        this.compare(this.array[left], this.array[next])
      ) {
        next = left;
      }
      if (
        right <= size &&
        this.compare(this.array[right], this.array[next])
      ) {
        next = right;
      }

      if (next === idx) break;

      this.swap(idx, next);
      idx = next;
    }
  }

  swap(a, b) {
    [this.array[a], this.array[b]] = [this.array[b], this.array[a]];
  }
}

/**
 * 다익스트라
 * start에서 출발해 모든 노드까지의 최단거리 dist[]를 돌려준다.
 * g는 사용할 그래프(adj list)
 */
function dijkstra(start, g) {
  const dist = Array(n + 1).fill(Infinity);
  dist[start] = 0;

  const pq = new MinHeap((a, b) => a.weight < b.weight);
  pq.push({ dest: start, weight: 0 });

  while (pq.length > 0) {
    const { dest: curNode, weight: curCost } = pq.pop();

    // 이미 더 짧은 경로로 처리한 적 있으면 스킵
    if (curCost > dist[curNode]) continue;

    // 인접한 간선들 relax
    for (const { dest: nextNode, weight: edgeWeight } of g[curNode]) {
      const nextCost = curCost + edgeWeight;
      if (nextCost < dist[nextNode]) {
        dist[nextNode] = nextCost;
        pq.push({ dest: nextNode, weight: nextCost });
      }
    }
  }

  return dist;
}

// X에서 출발해서 각 노드까지(X -> i)
const distFromX = dijkstra(x, graph);

// 각 노드에서 X까지(i -> X)
// == 역방향 그래프에서 X -> i
const distToX = dijkstra(x, reverseGraph);

// 모든 학생 i에 대해 왕복 거리 계산: i -> X + X -> i
let answer = 0;
for (let i = 1; i <= n; i++) {
  const roundTrip = distToX[i] + distFromX[i];
  if (roundTrip > answer) answer = roundTrip;
}

console.log(answer);
