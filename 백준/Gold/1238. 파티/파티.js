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

      if (
        this.array[rightChild] &&
        this.compare(this.array[rightChild], this.array[leftChild])
      ) {
        nextChild = rightChild;
      }
      if (this.compare(this.array[current], this.array[nextChild])) {
        break;
      }
      this.swap(nextChild, current);
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
  x = 0,
  iCount = 0,
  lineCount = 0;
let graph = [];
readline
  .on("line", (line) => {
    if (lineCount === 0) {
      [n, m, x] = line
        .trim()
        .split(" ")
        .map((val) => Number(val));
      graph = Array.from({ length: n + 1 }, (val) => []);
      lineCount += 1;
    } else {
      let [src, dest, weight] = line
        .trim()
        .split(" ")
        .map((val) => Number(val));
      graph[src].push({ node: dest, weight: weight });
      iCount += 1;
      if (iCount === m) readline.close();
    }
  })
  .on("close", () => {
    let answers = [];
    let reversedGraph = Array.from({ length: n + 1 }, (val) => []);
    graph.forEach((current, src) => {
      current.forEach((nextNode) => {
        let { node, weight } = nextNode;
        reversedGraph[node].push({ node: src, weight: weight });
      });
    });
    let xTosrc = dijkstra(graph, x);
    let srcTox = dijkstra(reversedGraph, x);
    for (let i = 1; i <= n; i++) {
      if (i === x) answers.push(0);
      else {
        answers.push(srcTox[i] + xTosrc[i]);
      }
    }
    console.log(Math.max(...answers));

    function dijkstra(graph, startNode) {
      let pq = new PriorityQueue((a, b) => {
        if (a.weight < b.weight) return true;
        return false;
      });
      let weights = Array(n + 1).fill(Infinity);
      weights[startNode] = 0;
      pq.push({ node: startNode, weight: 0 });
      while (pq.length !== 0) {
        let { node: currentNode, weight: currentWeight } = pq.pop();
        if (currentWeight > weights[currentNode]) continue;
        for (let edge of graph[currentNode]) {
          let { node: nextNode, weight: nextWeight } = edge;
          let nextDist = currentWeight + nextWeight;
          if (weights[nextNode] > nextDist) {
            weights[nextNode] = nextDist;
            pq.push({ node: nextNode, weight: nextDist });
          }
        }
      }

      return weights;
    }
  });
