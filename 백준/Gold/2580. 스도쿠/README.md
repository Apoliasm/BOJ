# **[Gold IV] 스도쿠 - 2580**

[문제 링크](https://www.acmicpc.net/problem/2580)

### **성능 요약**

메모리: 15532 KB, 시간: 1344 ms

### **분류**

구현, 백트래킹

### **제출 일자**

2025년 10월 28일 15:57:37

### **문제 설명**

스도쿠는 18세기 스위스 수학자가 만든 '라틴 사각형'이랑 퍼즐에서 유래한 것으로 현재 많은 인기를 누리고 있다. 이 게임은 아래 그림과 같이 가로, 세로 각각 9개씩 총 81개의 작은 칸으로 이루어진 정사각형 판 위에서 이뤄지는데, 게임 시작 전 일부 칸에는 1부터 9까지의 숫자 중 하나가 쓰여 있다.

[](https://upload.acmicpc.net/508363ac-0289-4a92-a639-427b10d66633/-/preview/)

나머지 빈 칸을 채우는 방식은 다음과 같다.

1. 각각의 가로줄과 세로줄에는 1부터 9까지의 숫자가 한 번씩만 나타나야 한다.
2. 굵은 선으로 구분되어 있는 3x3 정사각형 안에도 1부터 9까지의 숫자가 한 번씩만 나타나야 한다.

위의 예의 경우, 첫째 줄에는 1을 제외한 나머지 2부터 9까지의 숫자들이 이미 나타나 있으므로 첫째 줄 빈칸에는 1이 들어가야 한다.

[](https://upload.acmicpc.net/38e505c6-0452-4a56-b01c-760c85c6909b/-/preview/)

또한 위쪽 가운데 위치한 3x3 정사각형의 경우에는 3을 제외한 나머지 숫자들이 이미 쓰여있으므로 가운데 빈 칸에는 3이 들어가야 한다.

[](https://upload.acmicpc.net/89873d9d-56ae-44f7-adb2-bd5d7e243016/-/preview/)

이와 같이 빈 칸을 차례로 채워 가면 다음과 같은 최종 결과를 얻을 수 있다.

[](https://upload.acmicpc.net/fe68d938-770d-46ea-af71-a81076bc3963/-/preview/)

게임 시작 전 스도쿠 판에 쓰여 있는 숫자들의 정보가 주어질 때 모든 빈 칸이 채워진 최종 모습을 출력하는 프로그램을 작성하시오.

### **입력**

아홉 줄에 걸쳐 한 줄에 9개씩 게임 시작 전 스도쿠판 각 줄에 쓰여 있는 숫자가 한 칸씩 띄워서 차례로 주어진다. 스도쿠 판의 빈 칸의 경우에는 0이 주어진다. 스도쿠 판을 규칙대로 채울 수 없는 경우의 입력은 주어지지 않는다.

### **출력**

모든 빈 칸이 채워진 스도쿠 판의 최종 모습을 아홉 줄에 걸쳐 한 줄에 9개씩 한 칸씩 띄워서 출력한다.

스도쿠 판을 채우는 방법이 여럿인 경우는 그 중 하나만을 출력한다.

# 분석

## DFS 또는 백트래킹할거면 과감하게 하기

### 9\*9 배열에서는 백트래킹으로 터질 일은 없긴하다

- **과감하게 구현하기**

## 백트래킹

- 불가능한 것은 미리 쳐내고, 가능한 것들을 끝까지 파고들기
- 구현만 잘하면 될듯
- **dfs처럼 깊이 들어가면서 안된다 싶으면 빠져나오기**
- **행열 길이가 15정도라면 충분히 고려 가능함**
  - 이론적으로는 exponential한 길이지만, 조건들 달라붙으면 충분히 해결 가능한 시간으로 처리될 것임

### 백트래킹의 일반적인 구조

- **재귀적 패턴**
- **dfs와 유사함을 인지하기**

```tsx
function backtrack(state) {
  if (정답을 찾았으면) {
    결과 저장;
    return;
  }

  for (선택 가능한 모든 선택지 of 현재 상태) {
    if (유효하지 않은 선택지라면) continue; // 가지치기

    **선택 적용;
    backtrack(업데이트된 상태);
    선택 되돌리기; // ← 백트래킹 핵심**
  }
}
```

- **빠져나오는 조건 추가하기**
  ```tsx
  let solved = false

  function traking(i){
  	**if(solved) return;**
  	if(i === length)
  		**solved =true;**
  		return;
  	}
  ```
- **백트래킹으로 적용하고 다시 되돌리기**
  - 이게 있어야 틀린 경우에 다시 돌아갈 수 있음
  ```tsx
  function tracking(i) {
        if (solved) return;
        if (i === zeros.length) {
          answer = field.map((row) => [...row]);
          solved = true;
          return;
        }
        let [row, col] = [zeros[i].row, zeros[i].col];
        let ables = findAbleValues(row, col);
        for (let able of ables) {
          **field[row][col] = able;
          tracking(i + 1);
          field[row][col] = 0;**
        }
      }
  ```

### 2차원배열 얕은 복사 주의

- 이차원배열을 […field]만 한다면
  - field 그대로 따라갈 것
  - 즉 얕은 복사
  - 반복문 돌면서 깊은 복사하기
  ```tsx
  answer = field.map((row) => [...row]);
  ```

```tsx
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
let field = Array.from({ length: 9 }, (_) => {
  return Array(9).fill(0);
});
let n = 0,
  rowCount = 0;
let zeros = [];
let answer = [];
readline
  .on("line", (line) => {
    if (rowCount < 9) {
      field[rowCount] = line
        .trim()
        .split(" ")
        .map((val, index) => {
          let [row, col] = [rowCount, index];
          if (Number(val) === 0) {
            zeros.push({ row: row, col: col });
          }
          return Number(val);
        });
      rowCount += 1;
      if (rowCount === 9) readline.close();
    }
  })
  .on("close", () => {
    let solved = false;
    tracking(0);
    answer.forEach((row) => {
      console.log(row.join(" "));
    });
    function tracking(i) {
      if (solved) return;
      if (i === zeros.length) {
        answer = field.map((row) => [...row]);
        solved = true;
        return;
      }
      let [row, col] = [zeros[i].row, zeros[i].col];
      let ables = findAbleValues(row, col);
      for (let able of ables) {
        field[row][col] = able;
        tracking(i + 1);
        field[row][col] = 0;
      }
    }
    function findAbleValues(row, col) {
      let used = Array(10).fill(false);
      for (let i = 0; i < 9; i++) {
        used[field[row][i]] = true;
      }
      for (let i = 0; i < 9; i++) {
        used[field[i][col]] = true;
      }
      let rowSection = Math.floor(row / 3) * 3;
      let colSection = Math.floor(col / 3) * 3;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          used[field[rowSection + i][colSection + j]] = true;
        }
      }
      let ables = [];
      for (let num = 1; num <= 9; num++) {
        if (!used[num]) ables.push(num);
      }
      return ables;
    }
  });
```
