# 문제

# **[Gold IV] 오큰수 - 17298**

[문제 링크](https://www.acmicpc.net/problem/17298)

### **성능 요약**

메모리: 213844 KB, 시간: 888 ms

### **분류**

자료 구조, 스택

### **제출 일자**

2025년 7월 9일 12:02:42

### **문제 설명**

크기가 N인 수열 A = A1, A2, ..., AN이 있다. 수열의 각 원소 Ai에 대해서 오큰수 NGE(i)를 구하려고 한다. Ai의 오큰수는 오른쪽에 있으면서 Ai보다 큰 수 중에서 가장 왼쪽에 있는 수를 의미한다. 그러한 수가 없는 경우에 오큰수는 -1이다.

예를 들어, A = [3, 5, 2, 7]인 경우 NGE(1) = 5, NGE(2) = 7, NGE(3) = 7, NGE(4) = -1이다. A = [9, 5, 4, 8]인 경우에는 NGE(1) = -1, NGE(2) = 8, NGE(3) = 8, NGE(4) = -1이다.

### **입력**

첫째 줄에 수열 A의 크기 N (1 ≤ N ≤ 1,000,000)이 주어진다. 둘째 줄에 수열 A의 원소 A1, A2, ..., AN (1 ≤ Ai ≤ 1,000,000)이 주어진다.

### **출력**

총 N개의 수 NGE(1), NGE(2), ..., NGE(N)을 공백으로 구분해 출력한다.

# 분석

## 우선 완전 탐색부터 시작해보기

- O(n\*n)이면 아주 쉽게 푼다.
- 하지만 그 수는 1000000. 당연히 시간초과
- 한 번 돌면서 패턴을 분석하기

## 패턴 찾기

- a1 …. a2 라면 a1의 오큰수는 a2다.
- 그 사이의 … 는 모든 수는 a1보다 작음.
- 이 사이의 … 에도 b1…b2 이 패턴이 반복되는 구조
- a1 b1 c1 …c2 b2 a2 이런 형태
- **그래서 큰 문제를 작은 문제로 쪼개는 DP를 구상**
- 한번 seq 순회하고 앞의 정보를 저장

## 어떻게 값을 저장하느냐 → 자료구조를 활용하기

- c1…c2를 재귀 형태로 반복해서 answer[c1] = c2로 바로 저장 하지만 c2로 저장해야 한다.
- **결국 가장 맨 앞의 값을 가져다 쓰는 형태 → 스택, 큐를 활용하기**
- **자료구조 활용 감각을 잊지말기**

### 자바스크립트 큐, 스택

- 가장 앞의 값을 꺼내다 쓰는거면 일단 큐든 스택이든 상관없음
- **스택을 쓴다면 그냥 arr 하고 pop만 해도 똑같이 구현됨**
- 큐는 arr.shift()가 O(n)이라서 시간초과되어서 따로 만들어줘야함
- **큐 클래스 만들 시간 아껴서 스택써도 되는 상황인지 파악하고 arr 하나로 마무리짓기**

```tsx
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Node {
  constructor(item) {
    this.item = item;
    this.nextNode = null;
  }
}

class Queue {
  constructor() {
    this.length = 0;
    this.headNode = null;
    this.tail = null;
    this.queue = [];
  }

  push(item) {
    let node = new Node(item);
    if (this.length === 0) {
      this.headNode = node;
    } else {
      node.next = this.headNode;
      this.headNode = node;
    }
    this.length += 1;
  }

  pop() {
    if (this.length === 0) {
      return null;
    } else {
      const toPop = this.headNode;
      if (this.length === 1) {
        this.headNode = null;
        this.tail = null;
      }
      this.headNode = toPop.next;
      this.length -= 1;
      return toPop.item;
    }
  }

  front() {
    if (this.length === 0) {
      return null;
    } else {
      return this.headNode.item;
    }
  }
}

let n = 0;
let lineCount = 0;
let seq = [];
readline
  .on("line", (line) => {
    if (lineCount === 0) {
      n = Number(line.trim());
      lineCount += 1;
    } else {
      seq = line
        .trim()
        .split(" ")
        .map((num) => Number(num));
      readline.close();
    }
  })
  .on("close", () => {
    const answers = Array(n).fill(-1);
    const queue = new Queue();
    for (let currentIndex = 0; currentIndex < n; currentIndex++) {
      let currentValue = seq[currentIndex];
      let frontIndex = queue.front();
      while (frontIndex !== null && seq[frontIndex] < currentValue) {
        frontIndex = queue.pop();
        answers[frontIndex] = currentValue;
        frontIndex = queue.front();
      }
      queue.push(currentIndex);
    }
    console.log(answers.join(" "));
  });
```

## 1. 완전 탐색으로 문제 분석하기

## 2. 알고리즘 뭐 사용해야할지 생각

## 3. 이를 어떤 자료구조로 더 효율적으로 할지 생각하기
