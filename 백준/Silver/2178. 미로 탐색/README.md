# **문제**

**[Silver I] 미로 탐색 - 2178**

[문제 링크](https://www.acmicpc.net/problem/2178)

### **성능 요약**

메모리: 14152 KB, 시간: 216 ms

### **분류**

그래프 이론, 그래프 탐색, 너비 우선 탐색, 격자 그래프

### **제출 일자**

2025년 8월 9일 22:35:22

### **문제 설명**

N×M크기의 배열로 표현되는 미로가 있다.

| 1   | 0   | 1   | 1   | 1   | 1   |
| --- | --- | --- | --- | --- | --- |
| 1   | 0   | 1   | 0   | 1   | 0   |
| 1   | 0   | 1   | 0   | 1   | 1   |
| 1   | 1   | 1   | 0   | 1   | 1   |

미로에서 1은 이동할 수 있는 칸을 나타내고, 0은 이동할 수 없는 칸을 나타낸다. 이러한 미로가 주어졌을 때, (1, 1)에서 출발하여 (N, M)의 위치로 이동할 때 지나야 하는 최소의 칸 수를 구하는 프로그램을 작성하시오. 한 칸에서 다른 칸으로 이동할 때, 서로 인접한 칸으로만 이동할 수 있다.

위의 예에서는 15칸을 지나야 (N, M)의 위치로 이동할 수 있다. 칸을 셀 때에는 시작 위치와 도착 위치도 포함한다.

### **입력**

첫째 줄에 두 정수 N, M(2 ≤ N, M ≤ 100)이 주어진다. 다음 N개의 줄에는 M개의 정수로 미로가 주어진다. 각각의 수들은 **붙어서** 입력으로 주어진다.

### **출력**

첫째 줄에 지나야 하는 최소의 칸 수를 출력한다. 항상 도착위치로 이동할 수 있는 경우만 입력으로 주어진다.

# 분석

## 전형적인 BFS

- **최소 거리**

### BFS 주의

1. queue 잘 만들기

   1. queue를 안만들고 단순 array로도 해결할 순 있다는 점
   2. head값만 갱신해 큐 만드는 시간을 절약하기

   ```tsx
   const q = [];
   let head = 0;
   q.push([0, 0]);

   //push
   const [r, c] = q[head++];
   ```

2. visited 처리 잘하기

   - visited를 queue에서 pop할 때 하면 상하좌우 칸을 돌때 중복으로 큐에 들어가는 경우가 발생할 수 있음
   - **큐에 push할 때 visited 처리하기**
   - 모든 거리를 기록하는 dist[row][col] 값을 visited [boolean][boolean] 대신할 수 있음

   ```tsx
   if (dist[nr][nc] !== 0) continue; // 이미 방문(거리 세팅됨)

   dist[nr][nc] = dist[r][c] + 1;
   ```

- 모범 담안
  ```tsx
  const dist = Array.from({ length: n }, () => Array(m).fill(0));
  const dr = [-1, 1, 0, 0];
  const dc = [0, 0, -1, 1];

  const q = [];
  let head = 0;

  // 시작점
  dist[0][0] = 1;
  q.push([0, 0]);

  while (head < q.length) {
    const [r, c] = q[head++];

    if (r === n - 1 && c === m - 1) {
      console.log(dist[r][c]);
      process.exit(0);
    }

    for (let k = 0; k < 4; k++) {
      const nr = r + dr[k],
        nc = c + dc[k];
      if (nr < 0 || nc < 0 || nr >= n || nc >= m) continue;
      if (grid[nr][nc] === 0) continue; // 벽
      if (dist[nr][nc] !== 0) continue; // 이미 방문(거리 세팅됨)

      dist[nr][nc] = dist[r][c] + 1; // 방문 마킹 + 거리 기록(= enqueue 시점)
      q.push([nr, nc]);
    }
  }
  ```
