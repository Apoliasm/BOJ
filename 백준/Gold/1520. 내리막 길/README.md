# **[Gold III] 내리막 길 - 1520**

[문제 링크](https://www.acmicpc.net/problem/1520)

### **성능 요약**

메모리: 24056 KB, 시간: 256 ms

### **분류**

다이나믹 프로그래밍, 그래프 이론, 그래프 탐색, 깊이 우선 탐색

### **제출 일자**

2025년 11월 5일 17:39:34

### **문제 설명**

여행을 떠난 세준이는 지도를 하나 구하였다. 이 지도는 아래 그림과 같이 직사각형 모양이며 여러 칸으로 나뉘어져 있다. 한 칸은 한 지점을 나타내는데 각 칸에는 그 지점의 높이가 쓰여 있으며, 각 지점 사이의 이동은 지도에서 상하좌우 이웃한 곳끼리만 가능하다.

[](https://upload.acmicpc.net/0e11f3db-35d2-4b01-9aa0-9a39252f05be/-/preview/)

현재 제일 왼쪽 위 칸이 나타내는 지점에 있는 세준이는 제일 오른쪽 아래 칸이 나타내는 지점으로 가려고 한다. 그런데 가능한 힘을 적게 들이고 싶어 항상 높이가 더 낮은 지점으로만 이동하여 목표 지점까지 가고자 한다. 위와 같은 지도에서는 다음과 같은 세 가지 경로가 가능하다.

[](https://upload.acmicpc.net/917d0418-35db-4081-9f62-69a2cc78721e/-/preview/)

[](https://upload.acmicpc.net/1ed5b78d-a4a1-49c0-8c23-12a12e2937e1/-/preview/)

[](https://upload.acmicpc.net/e57e7ef0-cc56-4340-ba5f-b22af1789f63/-/preview/)

지도가 주어질 때 이와 같이 제일 왼쪽 위 지점에서 출발하여 제일 오른쪽 아래 지점까지 항상 내리막길로만 이동하는 경로의 개수를 구하는 프로그램을 작성하시오.

### **입력**

첫째 줄에는 지도의 세로의 크기 M과 가로의 크기 N이 빈칸을 사이에 두고 주어진다. 이어 다음 M개 줄에 걸쳐 한 줄에 N개씩 위에서부터 차례로 각 지점의 높이가 빈 칸을 사이에 두고 주어진다. M과 N은 각각 500이하의 자연수이고, 각 지점의 높이는 10000이하의 자연수이다.

### **출력**

첫째 줄에 이동 가능한 경로의 수 H를 출력한다. 모든 입력에 대하여 H는 10억 이하의 음이 아닌 정수이다.

# 분석

## DFS랑 백트래킹은 엄연히 다른 것이다.

- **DFS는 지나갔던 경로를 다시 돌아오지 않음**
  - 스쳐갈 진 몰라도, visit = true해놓고 다시 그 노드에서 뭘 하진 않음
  - 백트래킹은 visit true → tracking → visit false 로 되돌리는 작업이 포함되어있음
- **이런 백트래킹은 노드 수가 많다면 반드시 시간초과**
- **이건 DFS가 아닌 Brute force 일 것**

## 중복된 행동이(특정 노드에 여러번 방문)있다면 반드시 DP를 생각하기

- **이미 계산된 상태가 있다면 그것을 스킵하는 형태**

  - **같은 상태로 들어오는 계산은 결과는 항상 같을 것임**
  - 내가 짰던 코드에서

  ```tsx
  function dfs(row, col, height) {
    if (row === n - 1 && col === m - 1) return 1;

    if (dp[row][col] !== -1) return dp[row][col];

    dp[row][col] = 0;

    for (let dir = 0; dir < 4; dir++) {
      let [nextRow, nextCol] = [row + dirRow[dir], col + dirCol[dir]];
      if (!isMovable(nextRow, nextCol)) continue;

      if (field[nextRow][nextCol] < height) {
        dp[row][col] += dfs(nextRow, nextCol, field[nextRow][nextCol]);
      }
    }
    return dp[row][col];
  }
  ```

  - 파라미터를 보면 여기서 특별한 **상태값**이 없음
    - 이러면 뭘해도 반드시 같은 행동을 취할 것
  - **그런게 아니라면 결과값을 저장하는 DP를 활용할 것**

### 일반적인 형태

```tsx
function dfs(state) {
  // 이미 계산한 적 있으면 바로 반환
  if (dp[state] !== -1) return dp[state];

  // 기저 사례
  if (기저조건) return 어떤값;

  // 아직 계산 안 했다면 계산 시작
  dp[state] = 0;
  for (다음 상태 next of state에서 갈 수 있는 상태들) {
    dp[state] += dfs(next); // 누적 (문제에 따라 +, max, min 등)
  }

  return dp[state];
}
```

- dp[1][3] = 여기서부터 갈 수 있는 경로의 수
  - 네 방면의 경로 수를 다 더한 값

```tsx
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
let n = 0,
  m = 0;
nCount = -1;
let field = [];
let answer = 0;
//상하좌우
let dirRow = [-1, 1, 0, 0];
let dirCol = [0, 0, -1, 1];

readline
  .on("line", (line) => {
    if (nCount === -1) {
      [n, m] = line
        .trim()
        .split(" ")
        .map((val) => Number(val));
      field = Array.from({ length: n }, (_) => []);
      nCount += 1;
    } else {
      field[nCount] = line
        .trim()
        .split(" ")
        .map((val) => Number(val));
      nCount += 1;
      if (nCount === n) readline.close();
    }
  })
  .on("close", () => {
    let dp = Array.from({ length: n }, (_) => Array(m).fill(-1));

    answer = dfs(0, 0, field[0][0]);

    console.log(answer);
    function dfs(row, col, height) {
      if (row === n - 1 && col === m - 1) return 1;

      if (dp[row][col] !== -1) return dp[row][col];

      dp[row][col] = 0;

      for (let dir = 0; dir < 4; dir++) {
        let [nextRow, nextCol] = [row + dirRow[dir], col + dirCol[dir]];
        if (!isMovable(nextRow, nextCol)) continue;

        if (field[nextRow][nextCol] < height) {
          dp[row][col] += dfs(nextRow, nextCol, field[nextRow][nextCol]);
        }
      }
      return dp[row][col];
    }

    function isMovable(nextRow, nextCol) {
      if (nextRow < 0 || nextCol < 0 || nextRow >= n || nextCol >= m)
        return false;
      return true;
    }
  });
```
