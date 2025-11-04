# **[Gold IV] 이분 그래프 - 1707**

[문제 링크](https://www.acmicpc.net/problem/1707)

### **성능 요약**

메모리: 146208 KB, 시간: 2268 ms

### **분류**

그래프 이론, 그래프 탐색, 너비 우선 탐색, 깊이 우선 탐색, 이분 그래프

### **제출 일자**

2025년 11월 4일 14:41:34

### **문제 설명**

그래프의 정점의 집합을 둘로 분할하여, 각 집합에 속한 정점끼리는 서로 인접하지 않도록 분할할 수 있을 때, 그러한 그래프를 특별히 이분 그래프 (Bipartite Graph) 라 부른다.

그래프가 입력으로 주어졌을 때, 이 그래프가 이분 그래프인지 아닌지 판별하는 프로그램을 작성하시오.

### **입력**

입력은 여러 개의 테스트 케이스로 구성되어 있는데, 첫째 줄에 테스트 케이스의 개수 K가 주어진다. 각 테스트 케이스의 첫째 줄에는 그래프의 정점의 개수 V와 간선의 개수 E가 빈 칸을 사이에 두고 순서대로 주어진다. 각 정점에는 1부터 V까지 차례로 번호가 붙어 있다. 이어서 둘째 줄부터 E개의 줄에 걸쳐 간선에 대한 정보가 주어지는데, 각 줄에 인접한 두 정점의 번호 u, v (u ≠ v)가 빈 칸을 사이에 두고 주어진다.

### **출력**

K개의 줄에 걸쳐 입력으로 주어진 그래프가 이분 그래프이면 YES, 아니면 NO를 순서대로 출력한다.

# 분석

## 문제 해석 잘하기

- 아래로 쭉 뻗는 그래프면 이분 그래프
- 갑자기 그 노드가 다시 위로 올라간다던가 하면 문제 발생

### 그래프 상황을 넓게 생각하기

- 그래프에서는 **노드는 많은데 엣지는 하나이거나 아무것도 연결되어 있지 않는 경우도 충분히 가능**
- 이런 경우도 고려해야함
  - 보통은 BFS 굴리면서 queue.empty부터 체크하겠지만
  - 어떤 노드부터 스타트할지를 결정해야함
  - 무지성 1부터가 아닌, 노드 혼자 동떨어진 경우, 그래프가 여러개로 나뉘어진 경우
    - 즉 모든 **그래프가 하나로 연결되어 있지 않고 떨어져 있는 상황도 고려해야함**

```tsx
function getAnswer(v) {
      let queue = new Queue();
      let depths = Array(v + 1).fill(-1);
      **for (let current = 1; current <= v; current++) {**
        let depth = -1;
        **if (depths[current] !== -1 || graph[current].length === 0)
	        continue;
        queue.push(current);**
        while (queue.length !== 0) {
          depth += 1;
          let ql = queue.length;
          for (let i = 0; i < ql; i++) {
            let current = queue.pop();
            depths[current] = depth;
            for (const nextNode of graph[current]) {
              if (depths[nextNode] === -1) {
                queue.push(nextNode);
              } else if (depths[nextNode] !== depth - 1) {
                return "NO";
              }
            }
          }
        }
      }
      return "YES";
    }
```

# 코드

```tsx
class Node {
  constructor(item) {
    this.item = item;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(item) {
    let node = new Node(item);
    if (!this.head) this.head = node;
    else this.tail.next = node;
    this.tail = node;
    this.length += 1;
  }
  pop() {
    if (!this.head) return null;
    let headNode = this.head;
    this.head = headNode.next;
    this.length -= 1;
    return headNode.item;
  }
}

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
let k = 0,
  kCount = 0,
  eCount = -1,
  src = 0,
  dest = 0,
  v = 0,
  e = 0,
  lineCount = 0;
let answer = [];
let graph = [];
readline
  .on("line", (line) => {
    if (lineCount === 0) {
      k = Number(line.trim());
      lineCount += 1;
    } else if (eCount === -1) {
      [v, e] = line
        .trim()
        .split(" ")
        .map((val) => Number(val));
      graph = Array.from({ length: v + 1 }, (_) => []);
      eCount += 1;
    } else {
      [src, dest] = line
        .trim()
        .split(" ")
        .map((val) => Number(val));
      graph[src].push(dest);
      graph[dest].push(src);
      eCount += 1;
      if (eCount === e) {
        answer.push(getAnswer(v));
        eCount = -1;
        kCount += 1;
        if (kCount === k) readline.close();
      }
    }

    function getAnswer(v) {
      let queue = new Queue();
      let depths = Array(v + 1).fill(-1);
      for (let current = 1; current <= v; current++) {
        let depth = -1;
        if (depths[current] !== -1 || graph[current].length === 0) continue;
        queue.push(current);
        while (queue.length !== 0) {
          depth += 1;
          let ql = queue.length;
          for (let i = 0; i < ql; i++) {
            let current = queue.pop();
            depths[current] = depth;
            for (const nextNode of graph[current]) {
              if (depths[nextNode] === -1) {
                queue.push(nextNode);
              } else if (depths[nextNode] !== depth - 1) {
                return "NO";
              }
            }
          }
        }
      }
      return "YES";
    }
  })
  .on("close", () => {
    console.log(answer.join("\n"));
  });
```
