# 문제

환경 파괴범 때문에 화가 난 숲의 요정은 나무 공격을 진행하려 합니다. 나무 공격 진행시 투사체 5개가 생성되어 지정된 방향으로 전진합니다. 각 투사체와 최초로 접촉한 환경 파괴범은 사라지게 되며 이때 투사체 역시 동시에 사라지게 됩니다. 만약 투사체가 환경 파괴범과 마주치지 않는다면 조용히 사라지게 됩니다.

이는 n×m 크기의 격자에서 진행됩니다. 초기에 격자의 각 칸에는 숫자 0 또는 1이 적혀있으며 0은 비어있음을, 1은 환경 파괴범이 해당 위치에 서있음을 뜻합니다.

!https://dtucmjdudjcrv.cloudfront.net/engineerstory-editor/207/117/f/f34debf9-a35e-40fd-a0d2-895498383509.png

숲의 요정은 항상 격자의 왼쪽 방향에서 나무 공격을 진행하며, 총 2회 진행합니다. 공격은 특정 행 L부터 행 R까지의 구간에 한하여 투사체를 만들어 진행하게 되며, 모든 투사체는 행 변화 없이 정확히 오른쪽 방향으로만 진행하게 됩니다. 투사체는 처음으로 만나는 환경 파괴범과 함께 사라지게 되며, 끝까지 만나지 않는 투사체는 조용히 사라지게 됩니다. L과 R의 차이는 항상 4이기 때문에 투사체는 항상 5개가 만들어짐에 유의합니다. 다음은 `1~5` 행에 걸쳐 공격을 진행한 경우입니다.

!https://dtucmjdudjcrv.cloudfront.net/engineerstory-editor/205/117/a/a578aa5e-ac92-403b-9c6f-087ac35e1e8a.gif

그 다음 두 번째 공격이 `2~6` 행에 걸쳐 진행되면, 다음과 같은 결과를 얻게 됩니다.

!https://dtucmjdudjcrv.cloudfront.net/engineerstory-editor/206/117/f/fde80929-e3c8-430c-a4a4-caa08b93b2a0.gif

따라서 위의 예시에서는 2번의 공격 이후 남아있는 서로 다른 환경 파괴범의 수가 2명이 됩니다.

초기 격자의 정보와 2번의 공격에 대한 정보가 주어졌을 때, 공격을 순서대로 진행한 이후 격자에 남아있는 서로 다른 환경 파괴범의 수를 구하는 프로그램을 작성해보세요.

본 문제의 저작권은 (주)브랜치앤바운드에 있으며, 저작자의 동의 없이 무단 전재/복제/배포를 금지합니다.

**제약조건
[조건 1] 5 ≤ n, m ≤ 100
[조건 2] 1 ≤ L1, L2, R1, R2 ≤ n**

\*\*입력형식
첫 번째 줄에는 격자의 크기를 나타내는 n과 m이 공백을 사이에 두고 주어집니다.

두 번째 줄부터는 n개의 줄에 걸쳐 각 행에 해당하는 m개의 격자 정보가 공백을 사이에 두고 주어집니다. 격자 내 숫자는 0, 1로만 주어지며 0은 비어있는 칸을, 1은 환경 파괴범이 있는 칸임을 뜻합니다.
n+2번째 줄에는 첫 번째 공격 정보에 해당하는 L1,R1값이 공백을 사이에 두고 주어집니다. 이는 L1번째 행부터 R1번째 행까지 공격이 이루어짐을 뜻하며, R1−L1은 항상 4임을 가정해도 좋습니다.
n+3번째 줄에는 두 번째 공격 정보에 해당하는 L2,R2값이 공백을 사이에 두고 주어집니다. 이는 L2번째 행부터 R2번째 행까지 공격이 이루어짐을 뜻하며, R2−L2는 항상 4임을 가정해도 좋습니다.\*\*

**출력형식
첫 번째 줄에 두 번의 공격 이후 격자에 남아있는 서로 다른 환경 파괴범의 수를 출력합니다.**

### **입력예제1**

```
6 8
0 0 1 0 0 0 1 0
0 0 0 1 0 0 0 0
0 0 1 0 0 1 1 0
0 0 0 0 1 0 0 0
0 0 0 0 0 0 0 0
0 0 0 1 0 0 0 0
1 5
2 6
```

### **출력예제1**

```
2
```

#

### **입력예제2**

```
8 8
1 1 1 1 1 1 1 1
1 1 1 1 1 1 1 1
1 1 1 1 1 1 1 1
1 1 1 1 1 1 1 1
1 1 1 1 1 1 1 1
1 1 1 1 1 1 1 1
1 1 1 1 1 1 1 1
1 1 1 1 1 1 1 1
1 5
4 8
```

### **출력예제2**

```
54
```

# 단순한 구현문제, 소프티어의 js input output에 집중하기

### 자바스크립트 타입 추론?

- **`n = ‘6’` 일 때 n+1은?**
  - ‘6’+1 = 7 이면 좋겠지만 아쉽게도 concat으로 인식되어 ‘61’이 될 수도 있음을 주의
  - **parseInt(element,10)으로 10진수로 바꾸기**
  -

# 코드

```tsx
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
rl.on("line", (line) => {
  input.push(
    line
      .trim()
      .split(" ")
      .map((element) => {
        return parseInt(element, 10);
      })
  );
}).on("close", () => {
  let destroyerMap = {};
  let total = 0;
  let [n, m] = input[0];
  for (let i = 1; i <= n; i++) {
    let eachRow = input[i];
    destroyerMap[i] = 0;
    eachRow.forEach((currentElement) => {
      if (currentElement === 1) {
        destroyerMap[i] += 1;
        total += 1;
      }
    });
  }
  let [firstStart, firstEnd] = input[n + 1];
  let [secondStart, secondEnd] = input[n + 2];
  Object.keys(destroyerMap).forEach((rowIndex) => {
    if (
      firstStart <= rowIndex &&
      rowIndex <= firstEnd &&
      destroyerMap[rowIndex] >= 1
    ) {
      total -= 1;
      destroyerMap[rowIndex] -= 1;
    }
  });
  Object.keys(destroyerMap).forEach((rowIndex) => {
    if (
      secondStart <= rowIndex &&
      rowIndex <= secondEnd &&
      destroyerMap[rowIndex] >= 1
    ) {
      total -= 1;
      destroyerMap[rowIndex] -= 1;
    }
  });

  console.log(total);
});
```
