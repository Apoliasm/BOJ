# **[Gold IV] 특정한 최단 경로 - 1504**

[문제 링크](https://www.acmicpc.net/problem/1504)

### **성능 요약**

메모리: 32868 KB, 시간: 3076 ms

### **분류**

그래프 이론, 최단 경로, 데이크스트라

### **제출 일자**

2025년 11월 2일 13:35:38

### **문제 설명**

방향성이 없는 그래프가 주어진다. 세준이는 1번 정점에서 N번 정점으로 최단 거리로 이동하려고 한다. 또한 세준이는 두 가지 조건을 만족하면서 이동하는 특정한 최단 경로를 구하고 싶은데, 그것은 바로 임의로 주어진 두 정점은 반드시 통과해야 한다는 것이다.

세준이는 한번 이동했던 정점은 물론, 한번 이동했던 간선도 다시 이동할 수 있다. 하지만 반드시 최단 경로로 이동해야 한다는 사실에 주의하라. 1번 정점에서 N번 정점으로 이동할 때, 주어진 두 정점을 반드시 거치면서 최단 경로로 이동하는 프로그램을 작성하시오.

### **입력**

첫째 줄에 정점의 개수 N과 간선의 개수 E가 주어진다. (2 ≤ N ≤ 800, 0 ≤ E ≤ 200,000) 둘째 줄부터 E개의 줄에 걸쳐서 세 개의 정수 a, b, c가 주어지는데, a번 정점에서 b번 정점까지 양방향 길이 존재하며, 그 거리가 c라는 뜻이다. (1 ≤ c ≤ 1,000) 다음 줄에는 반드시 거쳐야 하는 두 개의 서로 다른 정점 번호 v1과 v2가 주어진다. (v1 ≠ v2, v1 ≠ N, v2 ≠ 1) 임의의 두 정점 u와 v사이에는 간선이 최대 1개 존재한다.

### **출력**

첫째 줄에 두 개의 정점을 지나는 최단 경로의 길이를 출력한다. 그러한 경로가 없을 때에는 -1을 출력한다.

# 분석

## 플로이드와샬 쓰는 상황

- 중간에 거쳐가는 노드를 파악할 때
- 노드 수가 많지 않을 때
  - **O(nnn)이므로 노드 수가 크면 터질 수 있음**

### 구현 시 주의사항

- 초기값 Infiinity
- **자기 자신으로 향하는 칸은 0으로 설정**

```tsx
dist = Array.from({ length: n + 1 }, (_) => Array(n + 1).fill(Infinity));
for (let i = 1; i <= n; i++) dist[i][i] = 0;
```

### vs 다익스트라 알고리즘

- 이 문제를 다익스트라로 푼다면
  - 우선순위큐 다익스트라로 한다면 시간 절약 가능
    - O(vvv) → O(v+e)logv
- 다익스트라는 **특정 시작 지점부터 모든 도착지까지의 최단 거리를 구하는 알고리즘**
- src를 1, v1,v2 로 두고 총 세번 돌리면 되긴한다.

# 코드

```tsx
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
let n = 0,
  e = 0,
  eCount = 0,
  v1 = 0,
  v2 = 0,
  lineCount = 0;
let dist = [];
readline
  .on("line", (line) => {
    if (lineCount === 0) {
      [n, e] = line
        .trim()
        .split(" ")
        .map((val) => Number(val));
      lineCount += 1;

      dist = Array.from({ length: n + 1 }, (_) => Array(n + 1).fill(Infinity));
      for (let i = 1; i <= n; i++) dist[i][i] = 0;
    } else if (lineCount === 1 && eCount < e) {
      let [src, dest, weight] = line
        .trim()
        .split(" ")
        .map((val) => Number(val));

      dist[src][dest] = weight;
      dist[dest][src] = weight;
      eCount += 1;
      if (eCount === e) lineCount += 1;
    } else {
      [v1, v2] = line
        .trim()
        .split(" ")
        .map((val) => Number(val));
      readline.close();
    }
  })
  .on("close", () => {
    for (let through = 1; through <= n; through++) {
      for (let src = 1; src <= n; src++) {
        for (let dest = 1; dest <= n; dest++) {
          dist[src][dest] = Math.min(
            dist[src][through] + dist[through][dest],
            dist[src][dest]
          );
        }
      }
    }

    let answer = Math.min(
      dist[1][v1] + dist[v1][v2] + dist[v2][n],
      dist[1][v2] + dist[v2][v1] + dist[v1][n]
    );
    if (answer === Infinity) {
      console.log(-1);
    } else {
      console.log(answer);
    }
  });
```
