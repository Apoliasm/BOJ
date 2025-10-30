# **[Gold III] 파티 - 1238**

[문제 링크](https://www.acmicpc.net/problem/1238)

### **성능 요약**

메모리: 15504 KB, 시간: 184 ms

### **분류**

그래프 이론, 최단 경로, 데이크스트라

### **제출 일자**

2025년 10월 29일 19:23:53

### **문제 설명**

One cow from each of N farms (1 <= N <= 1000) conveniently numbered 1..N is going to attend the big cow party to be held at farm #X (1 <= X <= N). A total of M (1 <= M <= 100,000) unidirectional (one-way) roads connects pairs of farms; road i requires Ti (1 <= Ti <= 100) units of time to traverse.

Each cow must walk to the party and, when the party is over, return to her farm. Each cow is lazy and thus picks an optimal route with the shortest time. A cow's return route might be different from her original route to the party since roads are one-way.

Of all the cows, what is the longest amount of time a cow must spend walking to the party and back?

### **입력**

- Line 1: Three space-separated integers, respectively: N, M, and X
- Lines 2..M+1: Line i+1 describes road i with three space-separated integers: Ai, Bi, and Ti. The described road runs from farm Ai to farm Bi, requiring Ti time units to traverse.

### **출력**

- Line 1: One integer: the maximum of time any one cow must walk.

# 분석

## 최단거리 알고리즘 선택

### 다익스트라

- 다익스트라는 **음수 값일 경우는 피하기**
- 우선순위 큐 → O((E+V)logV)
- 선형 → O((E+V)V)

### 벨만 포드

- **음수 가중치**일때 사용

### 플로이드 와샬

- 웬만해선 다 되지만 **O(NNN)이므로 터질 가능성**

## 다익스트라 알고리즘

### 로직 기억해두기

- **모든 노드 → 도착지** 최단 거리를 구하는 알고리즘
- 그리디 알고리즘 기반
  - 최단 거리가 정해진 노드를 바탕으로 하나씩 이어가면서 모든 최단 거리를 구함
  > 첫 번째 루프 → (노드1 - 노드2) 확정됨
  두 번째 루프 → (노드1-노드2) + (노드2 - 노드3)과 현재 (노드1-노드3) 비교 → (노드1-노드3)
  …
  **모든 노드 - 도착 노드가 확정됨**
  >

1. **시작 노드 설정**
2. **루프 돌기**
   1. **현재 노드와 인접한 노드를 돌면서 최단 거리 갱신**
   2. **그중 가장 최단거리인 노드 선택**
   3. 그 노드를 현재 노드로 지정

### 우선순위 큐 다익스트라

- **선형으로 최단 거리를 구하는건 O(n)이지만, 우선순위 큐는 O(logn)**
- visited를 쓸 필요가 없음
  - pop하면서 최단거리보다 크면 계산할 필요 없음이 논리적으로 visited 함수와 일치함

1. 시작 노드, 가중치 push
2. 큐 빌 때까지 루프 돌기
   1. 현재 노드,가중치 pop
   2. 이미 최단 거리가 정해져있다면 → continue
   3. 인접한 노드 계산 → 현재 가중치보다 더 최단거리라면 push& 갱신

```tsx
let graph = Array.from({ length: n + 1 }, (val) => []);
let xToSrc = dijkstra(graph, x);
function dijkstra(graph, startNode) {
  //0. 우선순위 큐 + 비교함수
  let pq = new PriorityQueue((a, b) => {
    if (a.weight < b.weight) return true;
    return false;
  });

  //1.Infinity로 현재 거리 설정 & 시작점은 0
  let weights = Array(n + 1).fill(Infinity);
  weights[startNode] = 0;
  //1.시작점 push
  pq.push({ node: startNode, weight: 0 });
  //큐 빌때까지 loop
  while (pq.length !== 0) {
    //가장 짧은 거리로 가는 노드와 거리 pop
    let { node: currentNode, weight: currentWeight } = pq.pop();
    //뽑은게 이미 갱신된 노드였다면 바로 넘기기 = visited와 같은 역할
    if (currentWeight > weights[currentNode]) continue;
    //그 노드와 인접한 노드를 순회
    for (let edge of graph[currentNode]) {
      let { node: nextNode, weight: nextWeight } = edge;
      let nextDist = currentWeight + nextWeight;
      //현재 가중치랑 비교해서 갱신해야한다면 push & 갱신
      if (weights[nextNode] > nextDist) {
        weights[nextNode] = nextDist;
        pq.push({ node: nextNode, weight: nextDist });
      }
    }
  }

  return weights;
}
```

### 돌아가야하는 최단 거리를 구한다면 → 그래프 뒤집기

- **다익스트라는 시작지점 → 모든 도착지**를 구하는 알고리즘
- 모든 노드 → 도착지 → 왔던 노드를 구한다면?
  - 그래프 뒤집고 다익스트라 한번 더 돌리기
- 모든 src → dest→ src를 구한다면…
  - dest → src 는 **모든 시작지점 → 도착지**
    - 주어진 그래프를 쓰면 구해진다
  - src → dest는 그래프를 뒤집기
    - 뒤집힌 그래프는 dest→src로 향하게 될 것
    - 다익스트라를 쓰면 뒤집힌 dest → src가 구해질 것
    - **이게 곧 최단 src → dest와 같게 된다.**
- **자세한 설명**
  좋아 👍
  이건 눈으로 보면 한 번에 이해돼.
  BOJ 1238 “파티” 문제처럼 **모든 마을 → X → 마을**로 가는 문제를
  왜 “그래프 뒤집기(reverse graph)”로 해결하는지를
  아래 그림으로 직관적으로 보여줄게.
  ***
  ## 🎯 목표
  모든 마을 i가
  > i → X (파티 가는 길)
  >
  > X → i (파티에서 돌아오는 길)
  >
  > 두 가지 최단거리를 구하고,
  >
  > 그 중 왕복이 제일 오래 걸리는 사람을 찾는 문제야.
  ***
  ## 💡 핵심 아이디어
  다익스트라는
  > “하나의 출발점에서 다른 모든 노드로 가는 거리”
  >
  > 를 구할 수 있음.
  그런데 문제는
  > “모든 노드에서 X로 가는 거리”
  >
  > 도 구해야 한다는 거야.
  >
  > 이건 “출발점이 여러 개(i)”고, “도착점이 X”야.
  ***
  ## 🚧 그래프를 뒤집기 전
  ### 예시
  ```
  (1)───2──▶(2)
   │           │
   │           ▼
   4          (3)
   │           │
   ▼           │
  (X)<──3──────┘

  ```
  - 1 → 2 (2)
  - 1 → X (4)
  - 2 → 3 (1)
  - 3 → X (3)
  ***
  ### 우리가 구하고 싶은 것
  - 1 → X ?
  - 2 → X ?
  - 3 → X ?
  하지만 다익스트라는 **X에서 출발하는 방향(X → …)** 으로만 작동해.
  즉, 지금 상태에서는 X가 도착점이라 계산이 불가능해.
  ***
  ## 🔄 그래프를 뒤집은 후
  간선 방향을 전부 반대로 바꿔보자!
  ```
  (1)◀──2──(2)
   ▲           ▲
   │           │
   4           1
   │           │
  (X)──3──▶(3)

  ```
  즉:
  - 2 → 1 (2)
  - X → 1 (4)
  - 3 → 2 (1)
  - X → 3 (3)
  이제 다익스트라를 **X에서 출발**시키면,
  “X → i (in reversed graph)” = “i → X (in original graph)”
  이렇게 된다 ✅
  ***
  ## ⚙️ 실제로 구해지는 거리 비교
  | 그래프 종류 | 다익스트라 시작점 | 의미                   | 결과                 |
  | ----------- | ----------------- | ---------------------- | -------------------- |
  | 정방향      | X                 | X → i                  | 파티에서 돌아오는 길 |
  | 역방향      | X                 | i → X (원래 방향 기준) | 파티에 가는 길       |
  ***
  ## 🎨 한눈에 비교
  ### 원래 그래프
  ```
  1 → 2 → 3 → X
  ↑           │
  └──────4────┘

  ```
  **우리가 알고 싶은 건:**
  각 i가 X까지 가는 최단거리 (i → X)
  ***
  ### 뒤집은 그래프
  ```
  1 ← 2 ← 3 ← X
  ↑           │
  └──────4────┘

  ```
  **이제 X에서 출발하면:**
  - X → 3 → 2 → 1
    = 원래 그래프의 (1 → 2 → 3 → X)와 완전히 반대 경로!
  - 결과적으로 “i → X 거리”를 **X 기준으로 한 번에** 구할 수 있어.
  ***
  ## ✅ 결론
  | 단계 | 설명                                                       |
  | ---- | ---------------------------------------------------------- |
  | 1️⃣   | 정방향 그래프에서 `dijkstra(X)` 실행 → X → i (돌아오는 길) |
  | 2️⃣   | 역방향 그래프에서 `dijkstra(X)` 실행 → i → X (가는 길)     |
  | 3️⃣   | 각 i에 대해 합: (i→X + X→i)                                |
  | 4️⃣   | 최댓값이 가장 오래 걸리는 사람                             |
  ***
  ## 🧭 기억해라 — 그래프 뒤집기의 직관
  > 💬 “다익스트라는 출발점에서 퍼지는 알고리즘이야.”
  >
  > “도착점으로 모이는 문제는 간선을 반대로 바꾸면 된다.”
  즉,
  - **X가 출발점이면 → 방향 그래프로 ‘돌아오는 길’**
  - **X가 도착점이면 → 뒤집은 그래프로 ‘가는 길’**
  이 한 문장만 기억하면 앞으로 어떤 최단거리 문제든 해결할 수 있어.

## 우선순위 큐

### 이정도는 기억하고 쓰기

- compare함수를 콜백함수로 보내고 초기화 하는 우선순위 큐

```tsx
class PriorityQueue {
  constructor(compareCallback) {
    this.array = [0];
    this.compare = compareCallback;
  }

  get length() {
    return this.array.length - 1;
  }

  push(item) {
    this.array.push(item);
    this.heapUp();
  }
  pop() {
    let front = this.array[1];
    if (!front) return;
    this.heapDown();
    return front;
  }
  heapUp() {
    let current = this.length;
    while (current > 1) {
      let parent = Math.floor(current / 2);
      if (this.compare(this.array[current], this.array[parent])) {
        this.swap(current, parent);
        current = parent;
      } else {
        break;
      }
    }
  }
  heapDown() {
    let current = 1;
    this.array[current] = this.array[this.length];
    this.array.pop();
    while (current <= this.length) {
      let leftChild = current * 2;
      let rightChild = current * 2 + 1;
      let nextChild = leftChild;
      if (!this.array[leftChild]) break;

      if (
        this.array[rightChild] &&
        this.compare(this.array[rightChild], this.array[leftChild])
      ) {
        nextChild = rightChild;
      }
      if (this.compare(this.array[current], this.array[nextChild])) {
        break;
      }
      this.swap(nextChild, current);
      current = nextChild;
    }
  }
  swap(a, b) {
    [this.array[a], this.array[b]] = [this.array[b], this.array[a]];
  }
}

**let pq = new PriorityQueue((a, b) => {
    if (a.weight < b.weight) return true;
    return false;
  });**

```

# 전체 코드

```tsx
class PriorityQueue {
  constructor(compareCallback) {
    this.array = [0];
    this.compare = compareCallback;
  }

  get length() {
    return this.array.length - 1;
  }

  push(item) {
    this.array.push(item);
    this.heapUp();
  }
  pop() {
    let front = this.array[1];
    if (!front) return;
    this.heapDown();
    return front;
  }
  heapUp() {
    let current = this.length;
    while (current > 1) {
      let parent = Math.floor(current / 2);
      if (this.compare(this.array[current], this.array[parent])) {
        this.swap(current, parent);
        current = parent;
      } else {
        break;
      }
    }
  }
  heapDown() {
    let current = 1;
    this.array[current] = this.array[this.length];
    this.array.pop();
    while (current <= this.length) {
      let leftChild = current * 2;
      let rightChild = current * 2 + 1;
      let nextChild = leftChild;
      if (!this.array[leftChild]) break;

      if (
        this.array[rightChild] &&
        this.compare(this.array[rightChild], this.array[leftChild])
      ) {
        nextChild = rightChild;
      }
      if (this.compare(this.array[current], this.array[nextChild])) {
        break;
      }
      this.swap(nextChild, current);
      current = nextChild;
    }
  }
  swap(a, b) {
    [this.array[a], this.array[b]] = [this.array[b], this.array[a]];
  }
}

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
let n = 0,
  m = 0,
  x = 0,
  iCount = 0,
  lineCount = 0;
let graph = [];
readline
  .on("line", (line) => {
    if (lineCount === 0) {
      [n, m, x] = line
        .trim()
        .split(" ")
        .map((val) => Number(val));
      graph = Array.from({ length: n + 1 }, (val) => []);
      lineCount += 1;
    } else {
      let [src, dest, weight] = line
        .trim()
        .split(" ")
        .map((val) => Number(val));
      graph[src].push({ node: dest, weight: weight });
      iCount += 1;
      if (iCount === m) readline.close();
    }
  })
  .on("close", () => {
    let answers = [];
    let reversedGraph = Array.from({ length: n + 1 }, (val) => []);
    graph.forEach((current, src) => {
      current.forEach((nextNode) => {
        let { node, weight } = nextNode;
        reversedGraph[node].push({ node: src, weight: weight });
      });
    });
    let xTosrc = dijkstra(graph, x);
    let srcTox = dijkstra(reversedGraph, x);
    for (let i = 1; i <= n; i++) {
      if (i === x) answers.push(0);
      else {
        answers.push(srcTox[i] + xTosrc[i]);
      }
    }
    console.log(Math.max(...answers));

    function dijkstra(graph, startNode) {
      let pq = new PriorityQueue((a, b) => {
        if (a.weight < b.weight) return true;
        return false;
      });
      let weights = Array(n + 1).fill(Infinity);
      weights[startNode] = 0;
      pq.push({ node: startNode, weight: 0 });
      while (pq.length !== 0) {
        let { node: currentNode, weight: currentWeight } = pq.pop();
        if (currentWeight > weights[currentNode]) continue;
        for (let edge of graph[currentNode]) {
          let { node: nextNode, weight: nextWeight } = edge;
          let nextDist = currentWeight + nextWeight;
          if (weights[nextNode] > nextDist) {
            weights[nextNode] = nextDist;
            pq.push({ node: nextNode, weight: nextDist });
          }
        }
      }

      return weights;
    }
  });
```
