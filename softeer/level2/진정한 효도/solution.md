# 문제

남우는 어버이날을 맞아 부모님의 일을 돕기로 하였습니다. 남우의 부모님께서는 농사를 지으시기에, 남우는 땅을 일구는 일을 도우려고 합니다.

!https://softeer.ai/upload/2024/01/20240129_193200610_27328.png

남우에게 할당된 땅은 3 _ 3 크기의 격자로 이루어져 있으며, 각 땅의 높이는 1이상 3이하의 정수값으로 이루어져 있습니다. 부모님께서 농사를 지을 땅의 크기는 1 _ 3이며, 농사를 짓기 위해서는 해당 영역 내 땅의 높이가 전부 동일해야 합니다. 따라서 남우는 특정 땅의 높이를 낮추거나 높여, 3 \* 3 격자 내에 부모님께서 농사를 지을 수 있는 영역이 최소 1곳 이상 생기도록 만들려고 합니다.

!https://softeer.ai/upload/2024/01/20240129_193252188_66941.png

남우가 특정 땅의 높이를 1만큼 낮추거나 높이는데 1만큼의 비용이 소요된다고 했을 때, 부모님께서 농사를 지으실 수 있도록 땅을 일구기 위해 남우에게 필요한 최소 비용을 구하는 프로그램을 작성해보세요.

단, 1 _ 3 크기의 영역은 가로, 세로로 놓이는 것이 모두 가능하기에, 3 _ 3 크기의 격자에서는 땅의 높이만 동일하다면 최대 6개의 영역에 농사를 지을 수 있음에 유의합니다.

본 문제의 저작권은 (주) 브랜치앤바운드에 있으며, 저작자의 동의 없이 무단 전재/복제/배포를 금합니다.

\*\*제약조건

• 1 ≤ 땅의 높이 ≤ 3\*\*

- • 1 ≤ 땅의 높이 ≤ 3

**입력형식
세 개의 줄에 걸쳐 각 행에 해당하는 땅의 높이 정보가 공백을 사이에 두고 주어집니다.**

**출력형식
부모님께서 농사를 짓는 것이 가능해지기 위해 남우에게 필요한 최소 비용을 출력합니다.**

### **입력예제1**

```
1 1 1
2 3 1
3 1 2
```

### **출력예제1**

```
0
```

# 첫 번째 예제에서는 다음과 같이 영역을 잡으면, 이미 땅의 높이가 전부 동일하므로 추가적인 비용이 들지 않습니다.

!https://softeer.ai/upload/2024/01/20240129_193612107_00748.png

### **입력예제2**

```
1 1 3
1 1 3
3 3 1
```

### **출력예제2**

```
2
```

# 두 번째 예제에서는 다음과 같이 영역을 잡으면, 높이를 전부 1로 맞추기 위해 비용 2가 소요됩니다. 이보다 더 적은 비용으로 농사를 지을 수 있는 영역을 만들 수는 없습니다.

!https://softeer.ai/upload/2024/01/20240129_193619767_53408.png

# 분석

- 굉장히 제한되어있는 조건
  1. 전부 같을 때 : 무조건 0
  2. 전부 다를 때 : 1,2,3임 → 무조건 2
  3. 둘중 하나만 다를때 → 2,2,1 / 1,1,3
- 이 경우를 따지기 위한 set 사용
  - new Set(arr)
  - **Set에 쓸 수 있는 함수에 대해 알아가기**

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
      .map((element) => parseInt(element, 10))
  );
}).on("close", () => {
  let field = [[...input[0]], [...input[1]], [...input[2]]];
  let cost = 10;
  for (let i = 0; i < 3; i++) {
    cost = compareMin(
      cost,
      detechHowmuch([field[i][0], field[i][1], field[i][2]])
    );
    cost = compareMin(
      cost,
      detechHowmuch([field[0][i], field[1][i], field[2][i]])
    );
  }
  console.log(cost);
});

function detechHowmuch(arr) {
  const set = new Set(arr);
  if (set.size === 1) {
    return 0;
  } else if (set.size === 2) {
    let onlyOnce = 0;
    let twice = 0;
    arr.forEach((outerElement) => {
      let numOf = 0;
      arr.forEach((innerElement) => {
        if (innerElement === outerElement) {
          numOf += 1;
        }
      });
      if (numOf === 1) {
        onlyOnce = outerElement;
      } else {
        twice = outerElement;
      }
    });
    return onlyOnce > twice ? onlyOnce - twice : twice - onlyOnce;
  } else {
    // 1 2 3 모두 나타날 때 2로 맞추면 됨
    return 2;
  }
}

function compareMin(a, b) {
  return a < b ? a : b;
}
```
