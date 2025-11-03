const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
let n = 0,
  k = 0;
class Node {
  constructor(item) {
    this.item = item;
    this.next = null;
  }
}
class Queue {
  constructor() {
    this.head = null;
    this.length = 0;
    this.tail = null;
  }

  push(node) {
    if (!this.head) {
      this.head = node;
    } else {
      this.tail.next = node;
    }
    this.tail = node;
    this.length += 1;
  }
  pop() {
    if (!this.head) {
      return null;
    } else {
      let popNode = this.head;
      this.head = popNode.next;
      this.length -= 1;
      return popNode.item;
    }
  }
}
readline
  .on("line", (line) => {
    [n, k] = line
      .trim()
      .split(" ")
      .map((val) => Number(val));
    readline.close();
  })
  .on("close", () => {
    let queue = new Queue();
    let answer = [];
    let step = 1;
    for (let i = 1; i <= n; i++) {
      queue.push(new Node(i));
    }
    while (queue.length !== 0) {
      let current = queue.pop();
      if (step !== k) {
        queue.push(new Node(current));
        step += 1;
      } else {
        step = 1;
        answer.push(current);
      }
    }
    console.log(`<${answer.join(", ")}>`);
  });
