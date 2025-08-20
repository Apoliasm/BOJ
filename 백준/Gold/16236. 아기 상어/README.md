# **[Gold III] 아기 상어 - 16236**

[문제 링크](https://www.acmicpc.net/problem/16236)

### **성능 요약**

메모리: 12632 KB, 시간: 188 ms

### **분류**

구현, 그래프 이론, 그래프 탐색, 시뮬레이션, 너비 우선 탐색

### **제출 일자**

2025년 8월 20일 15:08:23

### **문제 설명**

N×N 크기의 공간에 물고기 M마리와 아기 상어 1마리가 있다. 공간은 1×1 크기의 정사각형 칸으로 나누어져 있다. 한 칸에는 물고기가 최대 1마리 존재한다.

아기 상어와 물고기는 모두 크기를 가지고 있고, 이 크기는 자연수이다. 가장 처음에 아기 상어의 크기는 2이고, 아기 상어는 1초에 상하좌우로 인접한 한 칸씩 이동한다.

아기 상어는 자신의 크기보다 큰 물고기가 있는 칸은 지나갈 수 없고, 나머지 칸은 모두 지나갈 수 있다. 아기 상어는 자신의 크기보다 작은 물고기만 먹을 수 있다. 따라서, 크기가 같은 물고기는 먹을 수 없지만, 그 물고기가 있는 칸은 지나갈 수 있다.

아기 상어가 어디로 이동할지 결정하는 방법은 아래와 같다.

- 더 이상 먹을 수 있는 물고기가 공간에 없다면 아기 상어는 엄마 상어에게 도움을 요청한다.
- 먹을 수 있는 물고기가 1마리라면, 그 물고기를 먹으러 간다.
- 먹을 수 있는 물고기가 1마리보다 많다면, 거리가 가장 가까운 물고기를 먹으러 간다.
  - 거리는 아기 상어가 있는 칸에서 물고기가 있는 칸으로 이동할 때, 지나야하는 칸의 개수의 최솟값이다.
  - 거리가 가까운 물고기가 많다면, 가장 위에 있는 물고기, 그러한 물고기가 여러마리라면, 가장 왼쪽에 있는 물고기를 먹는다.

아기 상어의 이동은 1초 걸리고, 물고기를 먹는데 걸리는 시간은 없다고 가정한다. 즉, 아기 상어가 먹을 수 있는 물고기가 있는 칸으로 이동했다면, 이동과 동시에 물고기를 먹는다. 물고기를 먹으면, 그 칸은 빈 칸이 된다.

아기 상어는 자신의 크기와 같은 수의 물고기를 먹을 때 마다 크기가 1 증가한다. 예를 들어, 크기가 2인 아기 상어는 물고기를 2마리 먹으면 크기가 3이 된다.

공간의 상태가 주어졌을 때, 아기 상어가 몇 초 동안 엄마 상어에게 도움을 요청하지 않고 물고기를 잡아먹을 수 있는지 구하는 프로그램을 작성하시오.

### **입력**

첫째 줄에 공간의 크기 N(2 ≤ N ≤ 20)이 주어진다.

둘째 줄부터 N개의 줄에 공간의 상태가 주어진다. 공간의 상태는 0, 1, 2, 3, 4, 5, 6, 9로 이루어져 있고, 아래와 같은 의미를 가진다.

- 0: 빈 칸
- 1, 2, 3, 4, 5, 6: 칸에 있는 물고기의 크기
- 9: 아기 상어의 위치

아기 상어는 공간에 한 마리 있다.

### **출력**

첫째 줄에 아기 상어가 엄마 상어에게 도움을 요청하지 않고 물고기를 잡아먹을 수 있는 시간을 출력한다.

# 분석

## 로직대로 잘 따라갔다.

```tsx
/**
 *
 * 0. 먹잇감이 있는지부터 체크,없으면 바로 끝내면 된다.
 * 1. 가장 가까운 먹이감을 찾는다.
 * 2. 이 가까운 것이라는 최단거리
 * 이 최단거리를 ...
 * 먹이 찾고 길이 계산, bfs로 최단 거리마다 큐에 넣고 계산?
 * O(nn) + 길이 계산O(nn) / 길이 계산만O(nn+e) 결국 bfs 과정이 포함됨
 * 3. 동점자 처리
 *
 */
```

- 결국 bfs를 써야함을 인지
- bfs로 가야할 노드를 필터링하고, 만약 먹잇감이면 먹잇감에 넣고 최적의 먹잇감 찾기

### BFS 구현은 했는데…

- **디버깅 하느라 시간이 다 갔다**
- programmer 같은데서 디버깅 하기란 엄청 어렵다.
- 빠르게 구현할것만 잘 하기!!!

### 오래 걸리게 만든 요인

- **방문한 노드 중복 방지**
  - visited를 언제 초기화 하고 언제 visited true로 만드느냐
  - **enqueue할 때 visited를 한다**
  - 그래야 중복된 노드를 enqueue 안 할 수 있음

### **DFS와 BFS visited 처리 비교**

# ✅ DFS와 BFS의 `visited` 처리 정리

## 1. DFS (Depth-First Search)

📍 **처리 시점**

- **노드에 도착했을 때(= 함수 진입 시점, pop 시점)** `visited = true`

📍 **이유**

- DFS는 한 경로를 끝까지 따라 내려가는 방식이기 때문에,
  노드에 들어온 순간 “이미 방문했다”라고 표시해야 다시 재귀/스택으로 들어가지 않음.
- 경로를 탐색하는 과정에서 **중복 삽입 문제가 거의 없음** → pop 시점 처리로 충분.

📍 **예시 (재귀)**

```jsx
function dfs(node) {
  visited[node] = true; // 진입 시 방문 처리
  for (let next of graph[node]) {
    if (!visited[next]) {
      dfs(next);
    }
  }
}
```

---

## 2. BFS (Breadth-First Search)

📍 **처리 시점**

- **큐에 넣을 때(enqueue 시점)** `visited = true`

📍 **이유**

- BFS는 같은 거리(레벨)에서 여러 경로를 동시에 탐색합니다.
- 만약 `visited`를 **pop 시점**에 처리하면, 같은 노드가 여러 경로에서 발견되어 **큐에 중복으로 들어가는 문제**가 발생.
- 따라서 발견(큐 삽입) 순간 방문 체크를 해서 중복 삽입을 방지하는 것이 정석.

📍 **예시**

```jsx
function bfs(start) {
  let queue = [start];
  visited[start] = true; // enqueue 시 방문 처리

  while (queue.length) {
    let cur = queue.shift();
    for (let next of graph[cur]) {
      if (!visited[next]) {
        visited[next] = true; // 큐에 넣기 전에 체크
        queue.push(next);
      }
    }
  }
}
```

---

# 📌 최종 요약

- **DFS → pop(도착/재귀 진입) 시점에 visited 처리**
  - 중복 삽입 문제 없음 → 진입 시 처리로 충분.
- **BFS → enqueue 시점에 visited 처리**
  - 중복 삽입 방지 필요 → 큐에 넣을 때 처리하는 것이 정석.

---

👉 즉,

- DFS는 **“도착했을 때 방문 처리”**
- BFS는 **“큐에 넣을 때 방문 처리”**

---

- 디테일
  ```tsx
  if (foodCandidates.length === 0) {
    continue;
  }
  foodCandidates.sort((a, b) => {
    if (a.row !== b.row) {
      return a.row - b.row;
    } else {
      return a.col - b.col;
    }
  });
  let nextFood = foodCandidates[0];
  field[nextFood.row][nextFood.col] = 0;
  foodCandidates = [];
  ```
  - 정렬해서 가장 앞에 오는 것 보다는
  - 순간순간의 비교로 최적의 먹잇감을 판단하면 됨
    1. best = null
    2. 먹잇감이면 best를 갱신시킴
    3. 최종 확인에서 if(best)로 null여부 파악
    4. null 아니면(먹잇감있으면) 이미 갱신된 먹잇감을 처리함
  - 개선된 로직 슈도코드
  ```tsx
  FUNCTION BFS_FIND_NEXT_FOOD(Q, size):
      visited ← n×n false
      // 시작점 방문 처리(큐의 현재 front 기준)
      (fr, fc) ← FRONT(Q)
      visited[fr][fc] ← true

      dist ← 0

      WHILE Q not empty:
          dist ← dist + 1
          level_size ← SIZE(Q)
          **best ← null**  // 같은 거리에서 (row, col) 가장 작은 후보 1개만 추적

          REPEAT level_size times:
              (r, c) ← DEQUEUE(Q)

              FOR dir in [(−1,0),(0,−1),(0,1),(1,0)]:   // 상,좌,우,하(가독성)
                  nr ← r + dir.r
                  nc ← c + dir.c

                  IF out_of_bounds(nr, nc) OR visited[nr][nc]:
                      CONTINUE

                  cell ← field[nr][nc]

                  IF cell > size:          // 통과 불가
                      CONTINUE

                  visited[nr][nc] ← true   // ★ enqueue/candidate 등록 시점에 방문 처리

  								**//best에 갱신시킴**
                  **IF 1 ≤ cell < size:      // 먹을 수 있는 물고기
                      IF best == null OR (nr, nc) is lexicographically smaller than best:
                          best ← (nr, nc)

                  ELSE:                     // cell==0 or cell==size → 통과만 가능
                      ENQUEUE(Q, (nr, nc))**

          **// 이 거리에서 먹이 발견됐으면 최적 후보를 섭취**
          **IF best != null:**
              field[best.r][best.c] ← 0
              eat ← eat + 1
              IF eat == size:
                  size ← size + 1
                  eat ← 0
              time ← time + dist
              foods ← foods - 1
              RETURN best

      RETURN null   // 더 이상 먹을 수 있는 물고기 없음

  ```
