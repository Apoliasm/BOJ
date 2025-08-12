# 문제

[문제 링크](https://www.acmicpc.net/problem/1717)

### **성능 요약**

메모리: 56836 KB, 시간: 488 ms

### **분류**

자료 구조, 분리 집합

### **제출 일자**

2025년 8월 12일 18:48:09

### **문제 설명**

초기에 �+1$n+1$개의 집합 {0},{1},{2},…,{�}$\{0\}, \{1\}, \{2\}, \dots , \{n\}$이 있다. 여기에 합집합 연산과, 두 원소가 같은 집합에 포함되어 있는지를 확인하는 연산을 수행하려고 한다.

집합을 표현하는 프로그램을 작성하시오.

### **입력**

첫째 줄에 �$n$, �$m$이 주어진다. �$m$은 입력으로 주어지는 연산의 개수이다. 다음 �$m$개의 줄에는 각각의 연산이 주어진다. 합집합은 0$0$ �$a$ �$b$의 형태로 입력이 주어진다. 이는 �$a$가 포함되어 있는 집합과, �$b$가 포함되어 있는 집합을 합친다는 의미이다. 두 원소가 같은 집합에 포함되어 있는지를 확인하는 연산은 1$1$ �$a$ �$b$의 형태로 입력이 주어진다. 이는 �$a$와 �$b$가 같은 집합에 포함되어 있는지를 확인하는 연산이다.

### **출력**

1로 시작하는 입력에 대해서 �$a$와 �$b$가 같은 집합에 포함되어 있으면 "`YES`" 또는 "`yes`"를, 그렇지 않다면 "`NO`" 또는 "`no`"를 한 줄에 하나씩 출력한다.

# 분석

## 전형적인  Union-Find 문제임을 알기

### Union-find

- **집합을 다루는 알고리즘**
- 서로소 집합, 서로 같이 모여있는 함수인지 아닌지 파악하기 위한 알고리즘

### Find()

- 집합의 부모를 따라가다 보면 반드시 root가 나온다
    - **해당 노드의 부모 정보를 저장**
- 재귀적으로 따라가보면 나오게 되어있음
    - 하지만 최악의 경우 O(n)으로 모든 노드를 다 거쳐가게 될 것

```tsx
let parent = Array(n).fill(-1)
function find(node){
	if(node === parent[node]){
		return node
	}
	return find(node)
}
```

- 1 → 2→ 3→ 4(root)가 있을때 `find(1)`
    - find(1)할 때 마다 1 → 2→3→4 하게 될 것
    - **이 값을 저장한다면** **경로 압축됨**

### 개선된 Find() - 경로 압축

```tsx
function find(node){
	if(node === parent[node]){
		return node
	}
	return **parent[node] = find(node)**
}

/**
**let parents = [0, 2, 3, 4, 4, 5]; 
// 1→2→3→4→5(루트)

// find(1) 실행:
1. find(2) 실행
2. find(3) 실행
3. find(4) 실행
4. find(5) 실행 → 5가 루트이므로 리턴 5
5. parents[4] = 5, 리턴 5
6. parents[3] = 5, 리턴 5
7. parents[2] = 5, 리턴 5
8. parents[1] = 5, 리턴 5**

*/
```

- **처음 돌아갈 때 한 번은 O(n)이지만 나중에는 O(1)로 접근 가능하다.**
- 지금 예시에서 첫 `find(1)`은 O(n)이지만, 끝나고 나면 `parents = [0,5,5,5,5,5]`로 **완전 평탄화**됩니다.
- 그 다음 `find(1)`, `find(2)`, `find(3)`…은 **한 번에 루트를 반환**하니 **O(1)**.
- 결국 “**처음 한 번 비싸게 내고, 그 뒤로는 계속 싸게 쓴다**” → 여러 번 합치면 평균이 작아짐.

## Union()

- 집합을 붙이는 과정
    - 집합을 무작정 붙이면 depth가 크게 늘어날 수 있음
    - 최소한의 depth를 유지하기 위해 rank 도입
    - depth를 rank로 두고, **depth가 높은 집합의 root에다가 낮은 집합을 붙임**
        - rank=5,rank=3일때 rank=5에서 3을 붙이면 rank가 5에서 늘어나지 않음
    
    ```tsx
    function union(first, second) {
      **//1. 선택한 노드의 root**
      let firstParent = find(first)
      let secondParent = find(second)
      //같은 root를 가지면 union 필요없음
      if(firstParent === secondParent){
        return;
      }
    	
    	//2. rank가 더 높은 곳에다가 낮은 집합을 붙임
      if(ranks[firstParent] < ranks[secondParent]){
        parents[firstParent] = secondParent;
      }
      else if(ranks[firstParent] > ranks[secondParent]){
        parents[secondParent] = firstParent
      }
      else{
        parents[firstParent] = secondParent;
        ranks[secondParent] += 1
      }
    }
    ```
    

### 코드

```tsx
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let lineCount = 0,
  n = 0,
  m = 0,
  mCount = 0;
let parents = [];
let answer = [];
let ranks = [];
readline
  .on("line", (line) => {
    if (lineCount === 0) {
      [n, m] = line
        .trim()
        .split(" ")
        .map((val) => Number(val));
      lineCount += 1;
      parents = Array.from({ length: n + 1 }, (_, i) => Number(i));
      ranks = Array(n + 1).fill(0);
    } else {
      let [cmd, first, second] = line
        .trim()
        .split(" ")
        .map((val) => Number(val));

      if (cmd === 0) {
        union(first, second);
      } else {
        Check(first, second);
      }
      mCount += 1;
      if (mCount === m) {
        readline.close();
      }
    }
  })
  .on("close", () => {
    console.log(answer.join("\n"));
  });

function union(first, second) {
  let firstParent = find(first)
  let secondParent = find(second)
  if(firstParent === secondParent){
    return;
  }

  if(ranks[firstParent] < ranks[secondParent]){
    parents[firstParent] = secondParent;
  }
  else if(ranks[firstParent] > ranks[secondParent]){
    parents[secondParent] = firstParent
  }
  else{
    parents[firstParent] = secondParent;
    ranks[secondParent] += 1
  }
}

function Check(first, second) {
  let firstParent = find(first);
  let secondParent = find(second);
  if (firstParent === secondParent) {
    answer.push("YES");
  } else {
    answer.push("NO");
  }
}

function find(node) {
  if (parents[node] === node) {
    return node;
  }
  return parents[node] = find(parents[node]);
}

```