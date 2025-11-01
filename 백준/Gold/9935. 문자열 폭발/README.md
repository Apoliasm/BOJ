# **[Gold IV] 문자열 폭발 - 9935**

[문제 링크](https://www.acmicpc.net/problem/9935)

### **성능 요약**

메모리: 111988 KB, 시간: 348 ms

### **분류**

자료 구조, 문자열, 스택

### **제출 일자**

2025년 11월 1일 14:05:42

### **문제 설명**

Mirko likes to play with strings of characters, but this time he has taken it too far – he put an “explosion” in the string! An explosion is a series of characters which, if found in the vicinity of fire, explodes and starts a chain reaction.

Mirko, being as negligent as he usually is, forgot that his string contained an explosion and placed it near a candlelight. Thus the chain reaction began.

The chain reaction takes place in the following way:

- if a string contains explosions, they all explode and a new string is formed by concatenating the pieces without the exploding parts
- this concatenation could possibly create new explosions
- the chain reaction repeats while there are explosions in the string

Now Mirko wants to know whether anything will be left after this series of chain reactions. If nothing remains, output “FRULA” (without quotes). If, by any chance, something is left, output the final string remaining after all the reactions.

Please note: The explosion will not contain two equal characters.

### **입력**

The first line of input contains Mirko's string, (1 ≤ |Mirko's string| ≤ 1 000 000).

The second line of input contains the explosion string, (1 ≤ |explosion| ≤ 36).

Both Mirko's string and the explosion string consist of uppercase and lowercase letters of the English alphabet and digits 0, 1, … 9.

### **출력**

The first and only line of output must contain the final string remaining after all the reactions as stated in the task.

# 분석

## 스택이 사용될 때

- **내부에 중첩된 구조**
  - 작은 폭탄을 제거하면 또 큰 폭탄을 제거해야하는 상황
  - stack으로 하나씩 제거 필요
- 앞의 값에 대해 계산할 필요가 없을 때
  - 스택에 넣고 묵히면 될 일
  - 앞의 폭탄과 무관한 문자열을 모두 스택에 묵혀두고, 한번에 뽑아서 결과값 만들기

### 스택에 저장되는 것이 무엇이냐

- 결과 문자열
- **추가로 스택의 상태값을 저장하기 위한 스택을 추가했음**
  - 폭탄 문자열일때만 push 했지만, 폭탄 중간에 무관한 char가 들어왔을 때 처리에서 문제가 발생했음
  - 모든 값에 대해 push하는 것이 필요했다.
  ```tsx
  if (currentInput === bomb.charAt(bombIndex)) {
      bombIndex += 1;
    } else if (currentInput === bomb.charAt(0)) {
      bombIndex = 1;
    } **else {
      bombIndex = 0;
    }**
  ```

### 다른 접근 (더 깔끔한 모범답안)

- 스택을 하나만 쓰고
  - 매번 폭탄 검사를 진행하는 방식
  - **매번 검사를 하는 작업이 큰 비용이 드는게 아니라면 자료형 하나 더 쓰는 것보다 이런 접근을 생각하기**
  ```tsx
  for (let i = 0; i < str.length; i++) {
    stack.push(input[i]);
    bombIndex = 0;
    while (stack.top() === bomb[bombIndex]) {
      bombIndex++;
    }
    if (bombIndex === bombLength)
      for (let j = 0; j < bombLength; j++) stack.pop();
  }
  ```

## 코드

```tsx
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
let input = "",
  bomb = "";
lineCount = 0;
readline
  .on("line", (line) => {
    if (lineCount === 0) {
      input = line.trim();
      lineCount += 1;
    } else {
      bomb = line.trim();
      readline.close();
    }
  })
  .on("close", () => {
    let strStack = [];
    let bombIndexStack = [0];
    for (let i = 0; i < input.length; i++) {
      let currentInput = input.charAt(i);
      strStack.push(currentInput);
      let bombIndex = bombIndexStack[bombIndexStack.length - 1];
      if (currentInput === bomb.charAt(bombIndex)) {
        bombIndex += 1;
      } else if (currentInput === bomb.charAt(0)) {
        bombIndex = 1;
      } else {
        bombIndex = 0;
      }
      bombIndexStack.push(bombIndex);

      if (bombIndex === bomb.length) {
        for (let b = 0; b < bombIndex; b++) {
          bombIndexStack.pop();
          strStack.pop();
        }
      }
    }
    if (strStack.length === 0) {
      console.log("FRULA");
    } else {
      console.log(strStack.join(""));
    }
  });

/**
 *
 * stack
 * 중첩되는 구조
 * 이미 아닌 것들은 봂 필요도 없는 구조
 * stack을 떠올리기
 *
mirkovC84nizC8CC84844
C84
 * mirkovniz
 * 0
 *
 * 그 인덱스인지 판단, 아니면 [0]인지 판단
 *
 */
```
