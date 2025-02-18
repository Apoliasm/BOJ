# 문제

`(`와 `)`로만 이루어진 문자열 S가 아래 조건을 충족하면, 이를 **균형 잡힌 괄호 문자열**이라고 한다.

- S에 `1`과 `+`를 원하는 위치에 적절히 추가해서 제대로 된 수식을 만들 수 있다.
- - 예로, `(()())`는 ((1+1)+(1)+1) 등의 수식을 만들 수 있으므로 균형 잡힌 괄호 문자열이다.
  - 하지만, `())(`는 `1`과 `+`를 어떻게 넣어도 제대로 된 수식을 만들어 낼 수 없으므로 균형 잡힌 괄호 문자열이 아니다.

여기서, **제대로 된 수식**은 다음과 같이 정의된다.

- 1은 제대로 된 수식이다.
- T1과 T2가 제대로 된 수식이라면, 두 수식을 더하는 T1+T2도 제대로 된 수식이다.
- T가 제대로 된 수식이라면, 수식에 괄호를 씌운 (T)도 제대로 된 수식이다.

세훈이는 이 정의에 궁금증을 가지고, 균형 잡힌 괄호 문자열이 주어질 때 수식을 직접 만들어 보기로 했다.

**제약조건
2≤∣S∣≤200000**

**입력형식
첫 번째 줄에 균형 잡힌 괄호 문자열 S가 주어진다.**

**출력형식
첫 번째 줄에 주어진 괄호 문자열로 만들 수 있는 수식 T를 출력한다.출력되는 수식 T는 다음 조건을 충족해야 한다.
• 수식의 길이는 500000 이하여야 한다.
• T는 제대로 된 수식이어야 한다.
• T에서 `(`와 `)`만 남기면 S가 만들어져야 한다.
• T는 `(`, `)`, `1`, `+`로만 이루어져야 한다. 특히, 수식의 중간에 공백 등의 문자가 들어가면 안 된다.
입력 조건 내에서, 위 조건을 충족하는 수식을 만들 수 있음을 증명할 수 있다.
가능한 수식이 여러 가지인 경우, 그중 아무거나 하나를 출력한다.**

- • 수식의 길이는 500000 이하여야 한다.
- • T는 제대로 된 수식이어야 한다.
- • T에서 `(`와 `)`만 남기면 S가 만들어져야 한다.
- • T는 `(`, `)`, `1`, `+`로만 이루어져야 한다. **특히, 수식의 중간에 공백 등의 문자가 들어가면 안 된다.**

### **입력예제1**

```
(()())
```

### **출력예제1**

```
((1+1)+(1)+1)
```

#

### **입력예제2**

```
()()()
```

### **출력예제2**

```
(1)+(1)+(1)
```

# 분석

- 괄호 내부에 있는 것을 (1)로 바꾸기
- () () → () + () 닫는 괄호와 열린 괄호 사이 + 집어 넣기
  - **정규표현식을 사용**
  - 정규표현식에서 ()는 ‘그룹’을 의미
  - 문자열 ‘(’ 를 가리키기 위해서는 \\( 로 역슬래쉬 두번 넣어서 문자열임을 밝히기
  - **정규표현식에 대해 꼭 공부하고 가기**

# 코드

```tsx
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

var input = "";
rl.on("line", (line) => {
  input = line.trim();
}).on("close", () => {
  const replaced = input
    .replace(new RegExp("\\(\\)", "g"), "(1)")
    .replace(new RegExp("\\)\\(", "g"), ")+(");

  console.log(replaced);
});
```
