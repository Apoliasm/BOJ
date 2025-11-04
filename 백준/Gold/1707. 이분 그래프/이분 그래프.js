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

      queue.push(current);
    }
  })
  .on("close", () => {
    console.log(answer.join("\n"));
  });
