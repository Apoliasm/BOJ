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
