# 문제

연탄을 모든 집에 배달하려고 했던 산타는 큰 고민에 빠집니다. 각 집에는 연탄 난로가 있는데, 난로와 연탄 모두 원 모양으로 되어있기 때문에 난로의 반지름의 길이가 연탄의 반지름의 길이의 배수인 집에서만 이 연탄을 사용할 수 있다는 것입니다.

!https://softeer.ai/upload/2024/01/20240129_200448877_46382.png

n개의 집에 각각 놓여 있는 난로의 반지름의 길이가 주어졌을 때, 산타는 연탄의 반지름의 길이를 처음에 잘 설정하여 최대한 많은 집에서 이 연탄을 사용할 수 있도록 만들고자 합니다. 산타를 도와 연탄이 사용가능한 집의 수를 최대로 하는 프로그램을 작성해보세요. 단, 난로의 반지름과 연탄의 반지름은 항상 정수로 나타내지며, 연탄의 반지름은 항상 1보다 커야만 함에 유의합니다.

본 문제의 저작권은 (주)브랜치앤바운드에 있으며, 저작자의 동의 없이 무단 전재/복제/배포를 금지합니다.

\*\*제약조건

• 1 ≤ n ≤ 100
• 2 ≤ 난로의 반지름의 길이 ≤ 100\*\*

- • 1 ≤ n ≤ 100
- • 2 ≤ 난로의 반지름의 길이 ≤ 100

**입력형식
첫 번째 줄에는 집의 수 n이 주어집니다.
두 번째 줄에는 각 집에 놓여 있는 난로의 반지름의 길이가 공백을 사이에 두고 주어집니다.**

**출력형식
연탄 사용이 가능한 최대 집의 수를 출력합니다.**

### **입력예제1**

```
6
2 4 6 9 12 18
```

### **출력예제1**

```
5
```

### **입력예제2**

```
5
2 3 5 7 11
```

### **출력예제2**

```
1
```

# 분석

- 뭔가 복잡해보이지만 softeer는 제한 시간이 명확함
  - 1초에다가 최댓값이 100이면 브루트 포스해도 전혀 안늦음
  -

```tsx
/**
2 4 6 9 12 18 일때
2와 4보다 작은 수 사이
2,3
2,3 최대 가능 수 > 4최대 가능 수

그냥 브루트 포스해도 1초 안넘을듯
*/

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
      .map((element) => parseInt(element, 10))
  );
}).on("close", () => {
  let n = input[0][0];
  let sortedArray = input[1].sort((a, b) => a - b);
  let min = sortedArray[0];
  let max = sortedArray[n - 1];
  let result = 0;
  for (let i = 2; i <= max; i++) {
    let currentNum = 0;
    sortedArray.forEach((element) => {
      if (element % i === 0) {
        currentNum += 1;
      }
    });
    result = result <= currentNum ? currentNum : result;
  }
  console.log(result);
  process.exit(0);
});
```
