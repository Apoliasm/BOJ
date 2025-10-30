# **[Gold III] 최소비용 구하기 2 - 11779**

[문제 링크](https://www.acmicpc.net/problem/11779)

### **성능 요약**

메모리: 67228 KB, 시간: 596 ms

### **분류**

그래프 이론, 최단 경로, 데이크스트라, 역추적

### **제출 일자**

2025년 10월 30일 16:58:18

### **문제 설명**

n(1≤n≤1,000)개의 도시가 있다. 그리고 한 도시에서 출발하여 다른 도시에 도착하는 m(1≤m≤100,000)개의 버스가 있다. 우리는 A번째 도시에서 B번째 도시까지 가는데 드는 버스 비용을 최소화 시키려고 한다. 그러면 A번째 도시에서 B번째 도시 까지 가는데 드는 최소비용과 경로를 출력하여라. 항상 시작점에서 도착점으로의 경로가 존재한다.

### **입력**

첫째 줄에 도시의 개수 n(1≤n≤1,000)이 주어지고 둘째 줄에는 버스의 개수 m(1≤m≤100,000)이 주어진다. 그리고 셋째 줄부터 m+2줄까지 다음과 같은 버스의 정보가 주어진다. 먼저 처음에는 그 버스의 출발 도시의 번호가 주어진다. 그리고 그 다음에는 도착지의 도시 번호가 주어지고 또 그 버스 비용이 주어진다. 버스 비용은 0보다 크거나 같고, 100,000보다 작은 정수이다.

그리고 m+3째 줄에는 우리가 구하고자 하는 구간 출발점의 도시번호와 도착점의 도시번호가 주어진다.

### **출력**

첫째 줄에 출발 도시에서 도착 도시까지 가는데 드는 최소 비용을 출력한다.

둘째 줄에는 그러한 최소 비용을 갖는 경로에 포함되어있는 도시의 개수를 출력한다. 출발 도시와 도착 도시도 포함한다.

셋째 줄에는 최소 비용을 갖는 경로를 방문하는 도시 순서대로 출력한다. 경로가 여러가지인 경우 아무거나 하나 출력한다.

# 분석

## 다익스트라 복습

- **특정 시작점에서 모든 노드로의 최단 거리가 도출됨**
- **시작 지점부터 하나씩 붙이면서 특정 노드에 대해 최단 거리가 하나씩은 반드시 결정됨**
  - 첫 루프에는 시작점과 가장 가까운 노드들 중 하나 (depth = 1)
  - 두번째 루프에는 (depth=2)인 노드들 중 하나의 거리
  - …
  - 그래서 결국 VlogV만큼만 돌아갈 것
- 우선순위 큐에 들어가는 조건
  - dist[nextNode] < dist[current] + nextWeight 일때
    - **이때 src-current의 최단 거리에 대한 정보는 반드시 확정되어있을 것**
    - 이를 활용해 값을 저장하는 방식을 활용
    ```tsx
    function dijkstra(startNode) {
          let pq = new PriorityQueue(function compareCost(a, b) {
            if (a.cost < b.cost) return true;
            return false;
          });
          costs[startNode] = 0;
          **lastNodes[startNode] = -1;
          passNodeNums[startNode] = 1;**
          pq.push({ dest: startNode, cost: 0 });
          while (pq.length > 0) {
            let { dest: currentNode, cost: currentCost } = pq.pop();
            if (costs[currentNode] < currentCost) continue;
            for ({ dest: nextNode, cost: nextCost } of graph[currentNode]) {
              let totalCost = currentCost + nextCost;
              if (costs[nextNode] > totalCost) {
                **lastNodes[nextNode] = currentNode;
                passNodeNums[nextNode] = passNodeNums[currentNode] + 1;**
                costs[nextNode] = totalCost;
                pq.push({ dest: nextNode, cost: totalCost });
              }
            }
          }
        }
    ```

## 다익스트라 우선순위 큐는 그냥 알고 있자 좀

```tsx
class PriorityQueue {
  constructor(compareCallback) {
    this.array = [0];
    this.compare = compareCallback;
  }

  get length() {
    return this.array.length - 1;
  }

  push(item) {
    this.array.push(item);
    this.heapUp();
  }
  pop() {
    let front = this.array[1];
    if (!front) return;
    this.heapDown();
    return front;
  }
  heapUp() {
    let current = this.length;
    while (current > 1) {
      let parent = Math.floor(current / 2);
      if (this.compare(this.array[current], this.array[parent])) {
        this.swap(current, parent);
        current = parent;
      } else {
        break;
      }
    }
  }
  heapDown() {
    let current = 1;
    this.array[current] = this.array[this.length];
    this.array.pop();
    while (current <= this.length) {
      let leftChild = current * 2;
      let rightChild = current * 2 + 1;
      let nextChild = leftChild;
      if (!this.array[leftChild]) break;
      if (this.array[rightChild] && this.compare(rightChild, leftChild)) {
        nextChild = rightChild;
      }
      if (this.compare(this.array[current], this.array[nextChild])) break;
      this.swap(current, nextChild);
      current = nextChild;
    }
  }
  swap(a, b) {
    [this.array[a], this.array[b]] = [this.array[b], this.array[a]];
  }
}

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
let n = 0,
  m = 0,
  eCount = 0,
  lineCount = 0;
let graph = [];
let source = 0,
  destination = 0;
readline
  .on("line", (line) => {
    if (lineCount === 0) {
      n = Number(line.trim());
      graph = Array.from({ length: n + 1 }, (_) => []);
      lineCount += 1;
    } else if (lineCount === 1) {
      m = Number(line.trim());
      lineCount += 1;
    } else if (lineCount === 2) {
      let [src, dest, cost] = line
        .trim()
        .split(" ")
        .map((val) => Number(val));
      graph[src].push({ dest: dest, cost: cost });
      eCount += 1;
      if (eCount === m) {
        lineCount += 1;
      }
    } else {
      [source, destination] = line
        .trim()
        .split(" ")
        .map((val) => Number(val));
      readline.close();
    }
  })
  .on("close", () => {
    let costs = Array(n + 1).fill(Infinity);
    let lastNodes = Array(n + 1).fill(0);
    let passNodeNums = Array(n + 1).fill(0);
    dijkstra(source);

    console.log(costs[destination]);
    console.log(passNodeNums[destination]);

    let current = destination;
    let paths = [destination];
    while (current !== source) {
      paths.push(lastNodes[current]);
      current = lastNodes[current];
    }
    paths.reverse();
    console.log(paths.join(" "));
    function dijkstra(startNode) {
      let pq = new PriorityQueue(function compareCost(a, b) {
        if (a.cost < b.cost) return true;
        return false;
      });
      costs[startNode] = 0;
      lastNodes[startNode] = -1;
      passNodeNums[startNode] = 1;
      pq.push({ dest: startNode, cost: 0 });
      while (pq.length > 0) {
        let { dest: currentNode, cost: currentCost } = pq.pop();
        if (costs[currentNode] < currentCost) continue;
        for ({ dest: nextNode, cost: nextCost } of graph[currentNode]) {
          let totalCost = currentCost + nextCost;
          if (costs[nextNode] > totalCost) {
            lastNodes[nextNode] = currentNode;
            passNodeNums[nextNode] = passNodeNums[currentNode] + 1;
            costs[nextNode] = totalCost;
            pq.push({ dest: nextNode, cost: totalCost });
          }
        }
      }
    }
  });

/**
 *
 * 다익스트라 특정 노드로 부터 모든 노드까지의 거리
 * 등록할 때 마다 값 등록
 * 1-> 2 -> 3ㄱ
 * ㄴ-------> 5
 *
 * 이전에 거쳐야 할 노드 저장?
 *
 *
 */
```
