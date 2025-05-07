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

let graph;
let v = 0;
let e = 0;
let startNode = 0;
let inputIndex = 0;
let edgeIndex = 0;
readline
  .on("line", (line) => {
    if (inputIndex === 0) {
      inputIndex += 1;
      [v, e] = line.split(" ").map((each) => parseInt(each));
      graph = Array.from({ length: v + 1 }, () => {
        return [];
      });
    } else if (inputIndex === 1) {
      inputIndex += 1;
      startNode = parseInt(line.trim());
    } else {
      let [src, dest, weight] = line.split(" ").map((each) => parseInt(each));
      let newNode = new Edge(src, dest, weight);
      graph[src].push(newNode);
      edgeIndex += 1;
      if (edgeIndex >= e) readline.close();
    }
  })
  .on("close", () => {
    let weightArray = Array.from({ length: v + 1 }, () => {
      return Infinity;
    });
    let visited = Array.from({ length: v + 1 }, () => {
      return false;
    });
    weightArray[startNode] = 0;

    for (let i = 1; i < v; i++) {
      let mininumWeight = Infinity;
      let nextNode = 0;
      for (let nodeIndex = 1; nodeIndex <= v; nodeIndex++) {
        let currentWeight = weightArray[nodeIndex];
        if (currentWeight < mininumWeight && !visited[nodeIndex]) {
          mininumWeight = currentWeight;
          nextNode = nodeIndex;
        }
      }
      let currentNode = nextNode;
      visited[currentNode] = true;
      graph[currentNode].forEach((node) => {
        weightArray[node.dest] = Math.min(
          weightArray[node.dest],
          node.weight + weightArray[currentNode]
        );
      });
    }
    for (const result of weightArray.splice(1)) {
      console.log(result === Infinity ? "INF" : result);
    }
  });
