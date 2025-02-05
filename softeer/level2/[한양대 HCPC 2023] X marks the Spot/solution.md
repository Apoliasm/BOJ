# 문제

퍼즐을 좋아하는 하이비는 작년에 이어 올해에도 퍼즐과 관련된 문제를 내기로 했다.

이번에는 Indirect Indexing으로, 다음과 같은 방식을 따른다.

1.  N개의 문자열 쌍 (S1,T1), (S2,T2),…, (SN,TN)이 주어진다. 각 쌍에 대해, Si의 길이와 Ti의 길이는 같다.

2.  Si에서 글자 `x` 또는 `X`가 등장하는 위치를 Pi라고 하자. 이 위치는 항상 유일하다.

3.  이때, Ti의 Pi번째 글자를 읽으면 된다. **단, 소문자는 대문자로 바꿔야 한다.**

4.  예를 들어, Si가 `Indexing`이고 Ti가 `Indirect`라면 읽게 되는 글자는 `R`이 된다.

**제약조건
1 ≤ N ≤ 500,000
입력되는 문자열의 길이 합은 1,000,000을 넘지 않으며, 모든 문자열은 영어 알파벳 대소문자 또는 숫자로만 이루어져 있다.**

**입력형식
첫 번째 줄에 문자열 쌍의 개수 N이 주어진다.
두 번째 줄부터 N개의 줄에 걸쳐, i+1번째 줄에는 쌍을 이루는 두 문자열 Si,Ti가 공백으로 구분되어 주어진다.**

**출력형식
첫 번째 줄에 N개의 문자열 쌍에 대해 읽게 되는 글자를 차례대로 붙여서 출력한다.**

### **입력예제1**

```
8
Exit A1in
Axis A0on
Exam Star
WKXM XHHV
maxB pyht
XBut Club
ATax Keep
ifXY doC2
```

### **출력예제1**

```
10THHCPC
```

#

### **입력예제2**

```
13
Fix Via
Axis Anna
Linux Ideas
Matrix Review
Maximum ToExist
Exercise Practice
GrandPrix ProjectsI
Extraction Assistance
ComplexUnit Contributor
GulfOfMexico JohnHamilton
Approximately AfricaAndAsia
InTheContextOf Internationals
TextAlignCenter LakeSpringfield
```

### **출력예제2**

```
ANSWERISBLANK
```

# 분석

## string함수를 잘 써보기

- search로 x 가 들어간 index를 리턴
  - 유일하다는 조건이 있으니 예외처리 하지않았음
  - **RegExp로 x나 X를 찾기위해 대소문자 상관안하는 i 플래그 추가**
- toUpperCase로 대문자로 바꾸기

# 코드

```tsx
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];
rl.on("line", (line) => {
  input.push(line.trim().split(" "));
}).on("close", () => {
  let n = input[0][0];
  let result = "";
  for (let i = 1; i <= n; i++) {
    let [first, second] = input[i];
    let foundIndex = first.search(new RegExp("x", "i"));
    result += second[foundIndex].toUpperCase();
  }
  console.log(result);
});
```
