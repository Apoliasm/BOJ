# **[Gold IV] 최소 스패닝 트리 - 1197**

[문제 링크](https://www.acmicpc.net/problem/1197)

### **성능 요약**

메모리: 49748 KB, 시간: 588 ms

### **분류**

최소 스패닝 트리, 그래프 이론

### **제출 일자**

2025년 8월 21일 17:42:43

### **문제 설명**

그래프가 주어졌을 때, 그 그래프의 최소 스패닝 트리를 구하는 프로그램을 작성하시오.

최소 스패닝 트리는, 주어진 그래프의 모든 정점들을 연결하는 부분 그래프 중에서 그 가중치의 합이 최소인 트리를 말한다.

### **입력**

첫째 줄에 정점의 개수 V(1 ≤ V ≤ 10,000)와 간선의 개수 E(1 ≤ E ≤ 100,000)가 주어진다. 다음 E개의 줄에는 각 간선에 대한 정보를 나타내는 세 정수 A, B, C가 주어진다. 이는 A번 정점과 B번 정점이 가중치 C인 간선으로 연결되어 있다는 의미이다. C는 음수일 수도 있으며, 절댓값이 1,000,000을 넘지 않는다.

그래프의 정점은 1번부터 V번까지 번호가 매겨져 있고, 임의의 두 정점 사이에 경로가 있다. 최소 스패닝 트리의 가중치가 -2,147,483,648보다 크거나 같고, 2,147,483,647보다 작거나 같은 데이터만 입력으로 주어진다.

### **출력**

첫째 줄에 최소 스패닝 트리의 가중치를 출력한다.

# 분석

# 대놓고 크루스칼 알고리즘

- **최소 신장 트리를 만들 때 사용**
  - **가장 적은 비용으로 모든 노드를 연결하기 위함**
- **음수 weight가 포함된 그래프에서 최솟값을 구할 때**

# 최소 신장 트리

- **V개의 node, V-1개의 edge**

## Edge가 짧은 순서대로 넣으면 되는거 아닌가?

1. **Edge를 오름차순으로 정렬한다.**
2. **짧은 순서대로 연결만 하면 된다.**

- **하지만 Cycle이 형성 되는 경우를 반드시 고려해야 한다.**

![ScreenShot_2025-08-21_오후_4_26_23.png](attachment:8a108f9f-b889-4d02-8a0d-d65eaf4e0177:0522b374-5ab8-41a1-8004-f37f33d43d10.png)

![ScreenShot_2025-08-21_오후_4_29_34.png](attachment:19e6d585-0c36-407b-b3b3-2bd27c0a5fe2:134f8ebb-b0e6-4aea-93dc-52865a95c5c3.png)

- cycle이 나면 피하기

## Cycle 찾기 = Union-find 사용

- edge를 구성하는 두 노드가 같은 Root = 연결하면 반드시 Cycle이 됨
  - find(src) === find(dest) 면 Union 시켜 spanning tree에 붙임 → 두 노드의 Root가 같아짐
  - 아니면 skip
- **노드가 매우 많으면 find과정에서 stack size 초과될 수 있음!!**

### 개선된 Union-find

- Union은 그대로다 (Rank 사용)
  - 더 낮은 집합을 높은 집합에 붙임
  ```tsx
  function union(first, second) {
    let firstParent = find(first);
    let secondParent = find(second);
    if (firstParent === secondParent) {
      return;
    }
    if (ranks[firstParent] === ranks[secondParent]) {
      parent[firstParent] = secondParent;
      ranks[secondParent] += 1;
    } else {
      let [smaller, bigger] =
        ranks[firstParent] < ranks[secondParent]
          ? [firstParent, secondParent]
          : [secondParent, firstParent];
      parent[smaller] = bigger;
    }
  }
  ```
- Find는 기존에는 재귀적으로 call stack을 만드는 과정이 포함됨
  - O(n)이지만 반복문으로 src === Root인지 파악 후
  - 경로 압축을 반복문으로 진행
  ```tsx
  function find(x) {
    // 1단계: 루트 찾기 (root 변수를 위로 계속 따라감)
    //반복문을 돌면서 부모를 따라감. O(n)으로 해당 노드가 root인지 판단
    let root = x;
    while (root !== parent[root]) {
      root = parent[root];
    }

    // 2단계: 경로 압축
    //해당 노드가 root가 아니라면 부모를 바로 root에 갖다붙임
    //1->2->3->4->5 라면 2의 부모도 root로, 3의 부모도 root로 바꿈

    while (x !== parent[x]) {
      const p = parent[x]; // x의 원래 부모
      parent[x] = root; // x를 루트에 바로 연결
      x = p; // 다음 노드로 진행
    }

    return root; // 최종 루트 반환
  }
  ```

# 코드

```tsx
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Edge {
  constructor(src, dest, weight) {
    this.src = src;
    this.dest = dest;
    this.weight = weight;
  }
}

let lineCount = 0,
  v = 0,
  e = 0,
  eCount = 0;
let linked = 0;
let edgeArr = [];
let parent = [];
let ranks = [];
let answer = 0;
readline
  .on("line", (line) => {
    if (lineCount === 0) {
      [v, e] = line
        .trim()
        .split(" ")
        .map((val) => Number(val));
      parent = Array.from({ length: v + 1 }, (node, index) => {
        return index;
      });
      ranks = Array(v + 1).fill(0);
      lineCount += 1;
    } else {
      let [src, dest, weight] = line
        .trim()
        .split(" ")
        .map((val) => Number(val));
      edgeArr.push(new Edge(src, dest, weight));

      eCount += 1;
      if (eCount === e) readline.close();
    }
  })
  .on("close", () => {
    //1. Edge 오름차순 정렬
    edgeArr.sort((a, b) => {
      return a.weight - b.weight;
    });
    for (let edge of edgeArr) {
      let [src, dest, weight] = [edge.src, edge.dest, edge.weight];

      //v-1개 연결되면 완성 된 것 빠져나오기
      if (linked === v - 1) {
        break;
      }
      //같은 부모일 때 = Cycle일 때 아무 것도 하지않음
      if (find(src) === find(dest)) {
        continue;
      }
      //다른 부모일 때 갖다 붙임
      union(src, dest);
      answer += weight;
      linked += 1;
    }

    console.log(answer);
  });

function union(first, second) {
  let firstParent = find(first);
  let secondParent = find(second);
  if (firstParent === secondParent) {
    return;
  }
  if (ranks[firstParent] === ranks[secondParent]) {
    parent[firstParent] = secondParent;
    ranks[secondParent] += 1;
  } else {
    let [smaller, bigger] =
      ranks[firstParent] < ranks[secondParent]
        ? [firstParent, secondParent]
        : [secondParent, firstParent];
    parent[smaller] = bigger;
  }
}

function find(x) {
  // 1단계: 루트 찾기 (root 변수를 위로 계속 따라감)
  let root = x;
  while (root !== parent[root]) {
    root = parent[root];
  }

  // 2단계: 경로 압축
  while (x !== parent[x]) {
    const p = parent[x]; // x의 원래 부모
    parent[x] = root; // x를 루트에 바로 연결
    x = p; // 다음 노드로 진행
  }

  return root; // 최종 루트 반환
}
```
